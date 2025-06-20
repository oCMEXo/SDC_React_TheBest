import React, {FC, useState} from "react";
import '../../App.css';
import Input from "./Input";
import {OrderItemWithQuantity, OrderItemMenu, } from "./../../Page/Menu";



interface ContentMenuMainProps {
    items: OrderItemMenu[];
    addToOrder: (item: OrderItemWithQuantity) => void;
    quantityMap: { [key: string]: number | string };
    handleQuantityChange: (id: string, value: string) => void;
}


const ContentMenuMain: FC<ContentMenuMainProps> = ({items, addToOrder, quantityMap, handleQuantityChange}) => {

    const [expandedTextId, setExpandedTextId] = useState<string | null>(null);
    const [visibleBox, setVisibleBox] = useState(6);

    const handleVisibleSeeMore = () => {
        setVisibleBox((prevVisibleBox) => prevVisibleBox + 6);
    };

    const handleTextToggle = (id: string) => {
        setExpandedTextId(prev => (prev === id ? null : id));
    };

    const truncateText = (text: string, maxLength = 90, id: string) => {
        if (!text) return "";

        if (expandedTextId !== id) {
            return (
                <>
                    {text.length > maxLength ? (
                        <>
                            {text.slice(0, maxLength)}{" "}
                            <button
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    color: "black",
                                }}
                                onClick={() => handleTextToggle(id)}
                            >
                                (Read more...)
                            </button>
                        </>
                    ) : (
                        text
                    )}
                </>
            );
        }

        return text;
    };

    const visibleItems = items.slice(0, visibleBox);
    const MoreItems = visibleBox < items.length;

    return (
        <>
            <ul>
                {visibleItems.map((item) => (
                    <li key={item.id}>
                        <img src={item.img} alt={item.meal}/>
                        <div className="contentBlog">
                            <div className="nameAndCost">
                                <h3>{item.meal}</h3>
                                <p>${item.price}</p>
                            </div>
                            <p className="ipsum">
                                {item.instructions ? truncateText(item.instructions, 80, item.id) : null}
                            </p>
                            <div className="sizeAdd">
                                <Input
                                    addToOrder={(itemWithQuantity) => {
                                        const quantity = Number(quantityMap[item.id]) || 1;
                                        addToOrder({ ...item, quantity });
                                    }}                                    item={item}
                                    input={quantityMap?.[item.id] || ""}
                                    handleChange={(e) =>
                                        handleQuantityChange(item.id, e.target.value)
                                    }
                                    quantityMap={quantityMap}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {MoreItems && (
                <button className="seeMore" onClick={handleVisibleSeeMore}>
                    See more
                </button>
            )}
        </>
    );
};

export default ContentMenuMain;
