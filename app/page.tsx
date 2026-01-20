"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from 'react';

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [payMethod, setPayMethod] = useState('COD'); 
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', address: '', phone: '', city: '' });
  const productsRef = useRef<HTMLDivElement>(null);
  
  const whatsappNumber = "923116444124";
  const jazzCashNumber = "0311-6444124";

  // Prices in PKR based on complexity of art
  const products = [
    { id: 1, name: "Premium Ayatul Kursi", price: 8500, img: "/Box-1.jpeg", desc: "Heavy Texture Gold Work, 24x36 inch." },
    { id: 2, name: "Surah Fatiha Art", price: 4500, img: "/Box-2.jpeg", desc: "Minimalist Black & White Series." },
    { id: 3, name: "Modern Kufic Script", price: 12000, img: "/Box-3.jpeg", desc: "3D Layered Hand-painted Masterpiece." },
    { id: 4, name: "Urdu Poetry Frame", price: 3500, img: "/Box-4.jpeg", desc: "Custom Ghalib Poetry in Nastaliq." },
    { id: 5, name: "Bismillah Decor", price: 2500, img: "/Box-5.jpeg", desc: "Perfect for Entrance, Compact Size." },
    { id: 6, name: "Abstract Islamic Art", price: 6500, img: "/Box-6.jpeg", desc: "Vibrant Contemporary Fusion Art." },
  ];

  const addToCart = (p: any) => {
    const exist = cart.find(x => x.id === p.id);
    if (exist) {
      setCart(cart.map(x => x.id === p.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
    setIsCartOpen(true);
  };

  const checkout = () => {
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
      alert("Please fill delivery details first!");
      return;
    }

    let msg = `🚀 *NEW ORDER - ART STORE*\n\n`;
    msg += `👤 *Customer:* ${deliveryInfo.name}\n`;
    msg += `📞 *Phone:* ${deliveryInfo.phone}\n`;
    msg += `📍 *Address:* ${deliveryInfo.address}, ${deliveryInfo.city}\n`;
    msg += `💳 *Payment:* ${payMethod === 'COD' ? 'Cash on Delivery' : 'JazzCash / EasyPaisa'}\n`;
    msg += `\n--------------------------\n🛒 *ITEMS:*\n`;

    cart.forEach(item => {
      msg += `• *${item.name}* (x${item.qty}) - Rs ${item.price * item.qty}\n`;
    });

    msg += `\n💰 *Total Payable: Rs ${cart.reduce((a,c) => a + c.price * c.qty, 0)}*\n`;
    
    if(payMethod !== 'COD') {
      msg += `\n⚠️ _I will send payment to ${jazzCashNumber}_`;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main>
      <header className="glass-nav">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h1 className="rgb-text"> ART STORE</h1>
        </div>
        <nav className="nav-links">
          <button className="nav-link" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>HOME</button>
          <button className="nav-link" onClick={() => productsRef.current?.scrollIntoView({behavior:'smooth'})}>SHOP</button>
          <div style={{position:'relative', cursor:'pointer'}} onClick={() => setIsCartOpen(true)}>
            <span style={{fontSize:'28px'}}>🛒</span>
            {cart.length > 0 && <span className="cart-badge">{cart.reduce((a,c) => a+c.qty, 0)}</span>}
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2 className="rgb-text">Divine Elegance</h2>
          <p>Premium Handmade Calligraphy for your Luxury Home</p>
          <button className="glass-btn" onClick={() => productsRef.current?.scrollIntoView({behavior:'smooth'})}>Explore Collection</button>
        </div>
      </section>

      <section className="products" ref={productsRef}>
        {products.map(p => (
          <div key={p.id} className="product">
            <img src={p.img} alt={p.name} className="product-img" />
            <h3>{p.name}</h3>
            <p className="desc-text">{p.desc}</p>
            <p className="price">Rs {p.price.toLocaleString()}</p>
            <button className="glass-btn" style={{width:'100%'}} onClick={() => addToCart(p)}>Add to Bag</button>
          </div>
        ))}
      </section>

      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>🛒 Your Shopping Bag</h3>
          <button onClick={() => setIsCartOpen(false)} style={{background:'none', border:'none', color:'white', fontSize:'28px'}}>×</button>
        </div>
        
        <div className="cart-body">
          {cart.length > 0 && (
            <>
              <div className="delivery-form">
                <h4 style={{marginTop:0, color:'#ff4d4d'}}>📍 Delivery Details</h4>
                <input type="text" placeholder="Full Name" onChange={(e)=>setDeliveryInfo({...deliveryInfo, name: e.target.value})} />
                <input type="text" placeholder="WhatsApp Number" onChange={(e)=>setDeliveryInfo({...deliveryInfo, phone: e.target.value})} />
                <input type="text" placeholder="City" onChange={(e)=>setDeliveryInfo({...deliveryInfo, city: e.target.value})} />
                <textarea placeholder="Complete Address" rows={2} onChange={(e)=>setDeliveryInfo({...deliveryInfo, address: e.target.value})}></textarea>
              </div>

              <div className="payment-selector" style={{margin:'20px 0', padding:'15px', background:'#f0f0f0', borderRadius:'10px'}}>
                <h4 style={{margin:'0 0 10px 0', color:'#333'}}>💳 Payment Mode</h4>
                <div style={{display:'flex', gap:'10px'}}>
                  <button 
                    onClick={() => setPayMethod('COD')}
                    style={{flex:1, padding:'12px', borderRadius:'8px', fontSize:'13px', fontWeight:'bold', border: payMethod === 'COD' ? '2px solid #ff4d4d' : '1px solid #ccc', cursor:'pointer'}}
                  >
                    🏠 COD
                  </button>
                  <button 
                    onClick={() => setPayMethod('ONLINE')}
                    style={{flex:1, padding:'12px', borderRadius:'8px', fontSize:'13px', fontWeight:'bold', border: payMethod === 'ONLINE' ? '2px solid #ff4d4d' : '1px solid #ccc', cursor:'pointer'}}
                  >
                    📱 JazzCash
                  </button>
                </div>
              </div>
            </>
          )}

          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt="" />
              <div style={{flex:1}}>
                <h4 style={{margin:0, fontSize:'13px'}}>{item.name}</h4>
                <p style={{margin:0, color:'#ff4d4d', fontWeight:'bold'}}>Rs {item.price.toLocaleString()}</p>
              </div>
              <button onClick={() => setCart(cart.filter(x => x.id !== item.id))}>🗑</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', fontWeight:'bold', fontSize:'1.2rem', color:'#333'}}>
              <span>Total Bill:</span>
              <span>Rs {cart.reduce((a,c) => a + c.price * c.qty, 0).toLocaleString()}</span>
            </div>
            <button className="checkout-btn" onClick={checkout}>
              Confirm via WhatsApp
            </button>
          </div>
        )}
      </div>

      <div className={`overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}></div>
    </main>
  );
}