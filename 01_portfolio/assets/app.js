
function year(){document.getElementById('year').textContent=new Date().getFullYear();}
document.addEventListener('DOMContentLoaded',year);

// Simple form validation
function handleContactSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const out = document.getElementById('formStatus');
  if(!name || !email || !msg){ out.textContent='Please fill all fields.'; out.style.color='#fca5a5'; return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ out.textContent='Enter a valid email.'; out.style.color='#fca5a5'; return; }
  out.textContent='Thanks! Your message has been captured locally.'; out.style.color='#86efac';
  // store locally so the user can show persistence if needed
  const msgs = JSON.parse(localStorage.getItem('portfolio_messages')||'[]');
  msgs.push({name,email,msg,ts:Date.now()});
  localStorage.setItem('portfolio_messages',JSON.stringify(msgs));
  e.target.reset();
}
