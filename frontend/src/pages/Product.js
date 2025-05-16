import React, { useEffect, useState } from "react";

const Products = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost/api/products/aggregate")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Қате:", error));
    }, []);

    return (
        <div>
            <h2>Өнімдер статистикасы</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Категория: {item._id}, Барлығы: {item.totalQuantity},
                        Барлық баға: {item.totalPrice}, Сан: {item.count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
