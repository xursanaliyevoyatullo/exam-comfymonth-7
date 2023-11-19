import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading"
import { useDispatch } from "react-redux";
import { addItem } from "../redux/features/basketSlice";

function Material() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const api = `https://strapi-store-server.onrender.com/api/products/${id}`;
    const [data, setData] = useState();
    useEffect(() => {
        axios(api)
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [api]);

    const [selectedColor, setSelectedColor] = useState(null);
    const [productColor, setProductColor] = useState("");
    const [amount, setAmount] = useState(1);
    const handleColorClick = (color) => {
        setSelectedColor(color === selectedColor ? null : color);
        setProductColor(color);
    };

    const CartProduct = {
        // cartID: product.id + productColor,
        productID: Number(id),
        image: data && data.attributes.image,
        title: data && data.attributes.title,
        price: data && data.attributes.price,
        amount: Number(amount),
        productColor,
        company: data && data.attributes.company,
    };
    console.log(CartProduct);

    const addToCart = () => {
        dispatch(addItem({ product: CartProduct }));
    };


    if (data == null) {
        return <Loading />;
    }

    return (
        <>
            {data && (
                <div className="align-element mt-20 grid lg:grid-cols-2">
                    <img
                        src={data.attributes.image}
                        alt={data.attributes.title}
                        className=" w-96 h-80 object-cover rounded-lg"
                    />
                    <div>
                        <h2 className="card-title capitalize font-bold text-2xl tracking-wider mb-2">
                            {data.attributes.title}
                        </h2>
                        <p className="text-gray-400 font-medium mb-2">
                            {data.attributes.company}
                        </p>
                        <p
                            className="dark:text-[#F0F6FF] mb-6">
                            ${data.attributes.price}
                        </p>
                        <h2 className="leading-7 mb-4">
                            {data.attributes.description}
                        </h2>
                        <div>
                            <h4>Colors:</h4>
                            <div className="mt-2 flex gap-2">
                                {data.attributes.colors.map((color, index) => (
                                    <span
                                        key={index}
                                        onClick={() => handleColorClick(color)}
                                        style={{
                                            backgroundColor: color,
                                            border:
                                                selectedColor === color ? "2px solid #463AA1" : "none",
                                        }}
                                        className="span w-6 h-6 rounded-[50%] cursor-pointer"
                                    ></span>
                                ))}
                            </div>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label" for="amount">
                                <h4 className="text-md font-medium -tracking-wider capitalize">
                                    amount
                                </h4>
                            </label>
                            <select onChange={(e) => setAmount(e.target.value)} className="select select-primary border-indigo-600 mb-7 select-md" id="amount">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="mb-10">
                            <button onClick={addToCart} className="btn btn-primary">ADD TO BAG</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Material