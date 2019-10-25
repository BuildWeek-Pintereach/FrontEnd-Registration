import React from 'react';


const Article = ({ article }) => {
    const { title, link } = article;
    return (
        <div key={article.id}>
            <h1>Title: {title}</h1>
            <p>Link: {link}</p> 
        </div>
    )
};

export default Article;