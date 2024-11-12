// IMG ASSETS
const logo = 'https://i.imgur.com/Kz2RTwo.png'
const bin_icon = 'https://i.imgur.com/tYIM9mQ.png'
const cart_icon = 'https://i.imgur.com/Hssqnb2.png'
const contact_img = 'https://i.imgur.com/KuOgltk.png'
const cross_icon = 'https://i.imgur.com/xlzQpcn.png'
const dropdown_icon = 'https://i.imgur.com/35PQ0Jl.png'
const hero_img = 'https://i.imgur.com/F8RZink.png'
const about_img = 'https://i.imgur.com/Ys8zhoO.png'
const exchange_icon = 'https://i.imgur.com/cqcGmil.png'
const menu_icon = 'https://i.imgur.com/06zeGve.png'
const profile_icon = 'https://i.imgur.com/u8DfMqw.png'
const quality_icon = 'https://i.imgur.com/z9D0lW7.png'
const search_icon = 'https://i.imgur.com/SVKQqQc.png'
const support_img = 'https://i.imgur.com/Um4EzQG.png'
const mercado_pago = 'https://i.imgur.com/tNarIrl.png'

// IMG Productos
const p_img1 = 'https://i.imgur.com/t1ZQZtE.png';
const p_img1_1 = 'https://i.imgur.com/OTvzW9f.png';
const p_img1_2 = 'https://i.imgur.com/OpKyk2F.png';
const p_img1_3 = 'https://i.imgur.com/hhDbFRn.png' ;
const p_img1_4 = 'https://i.imgur.com/5hKOQx5.png' ;
const p_img2 = 'https://i.imgur.com/2vlXPC1.png' ;
const p_img3 = 'https://i.imgur.com/ow1q8x8.png' ;
const p_img4 = 'https://i.imgur.com/SFbeqUh.png' ;
const p_img5 = 'https://i.imgur.com/hhgHAJT.png' ;
const p_img6 = 'https://i.imgur.com/2Dkuo3y.png' ;
const p_img7 = 'https://i.imgur.com/NAhVbQ5.png' ;
const p_img8 = 'https://i.imgur.com/azt8W46.png' ;
const p_img9 = 'https://i.imgur.com/UDUkJZ8.png' ;
const p_img10 = 'https://i.imgur.com/lIXc31E.png' ;
const p_img11 = 'https://i.imgur.com/b00o0Si.png' ;
const p_img12 = 'https://i.imgur.com/8E1t5Cx.png' ;

// Define el objeto de `assets`
const assets = {
    logo,
    bin_icon,
    cart_icon,
    contact_img,
    cross_icon,
    dropdown_icon,
    hero_img,
    about_img,
    exchange_icon,
    menu_icon,
    profile_icon,
    quality_icon,
    mercado_pago,
    search_icon,
    support_img,
};

// Define el objeto de `images`
const images = {
    p_img1,
    p_img1_1,
    p_img1_2,
    p_img1_3,
    p_img1_4,
    p_img2,
    p_img3,
    p_img4,
    p_img5,
    p_img6,
    p_img7,
    p_img8,
    p_img9,
    p_img10,
    p_img11,
    p_img12,
};

// Exporta ambos objetos
export { assets, images };



export const products = [
    {
        _id: "0001",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 12000,
        image: [p_img1],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["S", "L"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0002",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 10000,
        image: [p_img2],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["M", "L"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0003",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 11000,
        image: [p_img3],
        category: "Remeras",
        subCategory: "Unicas",
        sizes: ["S", "M"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0004",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 12000,
        image: [p_img4],
        category: "Remeras",
        subCategory: "Lisas",
        sizes: ["S", "M"],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0005",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 15000,
        image: [p_img5],
        category: "Remeras",
        subCategory: "Lisas",
        sizes: ["S", "M"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0006",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 16000,
        image: [p_img6],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["S", "M"],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0007",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 17000,
        image: [p_img7],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: [ "M"],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0008",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 12500,
        image: [p_img8],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["S", "M"],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0009",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 10500,
        image: [p_img9],
        category: "Remeras",
        subCategory: "Unicas",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0010",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 12400,
        image: [p_img10],
        category: "Remeras",
        subCategory: "Lisas",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestSeller: true
    },
    {
        _id: "0011",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 11200,
        image: [p_img11],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestSeller: false
    },
    {
        _id: "0012",
        name: "Remera simple a rayas",
        description: "Una camisa ligera y cómoda, a la moda y sencilla",
        price: 12200,
        image: [p_img12],
        category: "Remeras",
        subCategory: "Rayas",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestSeller: false
    },
]