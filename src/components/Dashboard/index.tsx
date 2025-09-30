"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Edit, Trash2, Plus, Search, Upload } from "lucide-react";
import { auth, db } from "./../../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  const productsCollection = collection(db, "products");

  // -------- Authentication Check --------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/signin"); // redirect to signin if not authenticated
      } else {
        setUser(currentUser);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  // -------- Fetch Products --------
  const fetchProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  // -------- Handlers --------
  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image: null });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setImagePreview(product.image);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, { ...formData, price: +formData.price });
      setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...formData, price: +formData.price } : p)));
    } else {
      const docRef = await addDoc(productsCollection, { ...formData, price: +formData.price });
      setProducts([...products, { id: docRef.id, ...formData, price: +formData.price }]);
    }
    setShowModal(false);
    setFormData({ name: "", description: "", price: "", image: null });
    setImagePreview(null);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // -------- Render --------
  if (loadingAuth) return <p>Loading...</p>;
  if (!user) return null; // user will be redirected

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative z-10 pt-24 pb-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-dark">Gestion des Produits</h1>
              <p className="text-dark-3 mt-2">Gérez votre catalogue de produits</p>
            </div>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-brown hover:bg-brown-dark text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 font-medium"
            >
              <Plus size={20} />
              Nouveau Produit
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-3 overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-3">
                <thead className="bg-gray-1">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-dark uppercase tracking-wider">Photo</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-dark uppercase tracking-wider">Titre</th>
                    <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-dark uppercase tracking-wider">Description</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-dark uppercase tracking-wider">Prix</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-dark uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-3 bg-white">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-1 transition-colors duration-200">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-gray-1 flex items-center justify-center border border-gray-3">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-dark-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">{product.name}</td>
                      <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-dark-3 truncate max-w-xs">{product.description}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-brown">{product.price.toFixed(2)} €</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-1 sm:gap-2">
                          <button onClick={() => handleEditProduct(product)} className="p-1.5 sm:p-2 text-brown hover:bg-brown-light-3 rounded-md transition-all duration-200">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-md transition-all duration-200">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b border-gray-3 bg-gray-1 sticky top-0 z-10">
                  <h2 className="text-lg font-bold">{editingProduct ? "Modifier le produit" : "Nouveau produit"}</h2>
                  <button onClick={() => setShowModal(false)} className="text-dark-3 hover:text-dark hover:bg-gray-2 p-1.5 rounded-md">
                    <X size={20} />
                  </button>
                </div>

                <form className="p-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Photo du produit</label>
                      {imagePreview ? (
                        <div className="relative w-full h-48 rounded-md overflow-hidden bg-gray-1 border border-gray-3">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => { setFormData({ ...formData, image: null }); setImagePreview(null); }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-3 rounded-md cursor-pointer hover:border-brown hover:bg-brown-light-3/20">
                          <Upload className="text-dark-3 mb-2" size={32} />
                          <span className="text-sm text-dark-3 text-center px-4">Importer une photo</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1.5">Titre *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Laptop Pro"
                          className="w-full px-3 py-2 bg-gray-1 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/20 text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1.5">Prix (€) *</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min={0}
                          placeholder="0.00"
                          className="w-full px-3 py-2 bg-gray-1 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/20 text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1.5">Description</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Description du produit..."
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-1 border border-gray-3 rounded-md focus:outline-none focus:ring-2 focus:ring-brown/20 resize-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-3">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-3 rounded-md text-dark-3 text-sm">Annuler</button>
                    <button type="submit" className="flex-1 px-4 py-2.5 bg-brown text-white rounded-md hover:bg-brown-dark text-sm">
                      {editingProduct ? "Enregistrer" : "Ajouter le produit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
