import { useState, useEffect } from "react";

const mock = ["category 1", "category 2", "category 3"];

export const Sidebar = (props) => {
    const [current, setCurrent] = useState("");
    const [categories, setCategories] = useState(mock);

    const getData = async () => {
        const response = await fetch(
            `https://fakestoreapi.com/products/categories/?key=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        const updated = ["Everything"].concat(data);
        setCategories(updated);
    };

    /**
       * useEffect(callback, []) === callback da eseguire appena
       * il componente è aggiunto alla pagina (tipo DomContentLoaded
       * ma solo per il component) - è simile ad un AddEventListener
       */
    useEffect(() => {
        getData();
    }, []);

    const clicked = (event, category) => {
        event.preventDefault();
        //console.log(category);
        props.catSelection(category);
        setCurrent(category);
    };

    return (
        <aside>
            <h2>Categories</h2>
            <ul>
                {categories.map((item, index) => (
                    <li key={index}>
                        <a href={item} className={item === current ? "active" : ""} onClick={(event) => clicked(event, item)}>{item}</a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};