import React, { useState } from "react";
import axios from "axios";

const PostGenerator = () => {
  const [method, setMethod] = useState("AIDA");
  const [niche, setNiche] = useState("");
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePost = async () => {
    if (!niche || !product || !goal) {
      alert("Будь ласка, заповніть всі поля.");
      return;
    }

    setLoading(true);
    setResult(""); // Очистити попередній результат

    try {
      const response = await axios.post("http://localhost:5000/api/generate", {
        method,
        niche,
        product,
        goal,
      });
      setResult(response.data.post);
    } catch (error) {
      console.error("Помилка генерації поста:", error);
      setResult("Сталася помилка. Перевірте з'єднання із сервером.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Генератор Instagram постів</h1>
      <div className="mb-4">
        <label className="block mb-2">Методика:</label>
        <select
          className="w-full p-2 border rounded"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="AIDA">AIDA</option>
          <option value="4U">4U</option>
          <option value="PAS">PAS</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Ніша:</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Наприклад, одяг, косметика..."
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Продукт/Послуга:</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Наприклад, зимова куртка..."
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Ціль:</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Наприклад, залучити клієнтів, збільшити продажі..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={generatePost}
        disabled={loading}
      >
        {loading ? "Генеруємо..." : "Генерувати"}
      </button>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">Згенерований пост:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PostGenerator;
