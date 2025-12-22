
(function(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  let idx = 0;
  function show(i){
    slides.forEach((s,si)=>s.classList.toggle('active', si===i));
    dots.forEach((d,di)=>d.classList.toggle('active', di===i));
    idx = i;
  }
  if(slides.length){
    dots.forEach((d,di)=>d.addEventListener('click', ()=>show(di)));
    setInterval(()=>show((idx+1)%slides.length), 6500);
  }

  const tslides = Array.from(document.querySelectorAll('.tslide'));
  let tidx = 0;
  function tshow(i){
    tslides.forEach((s,si)=>s.classList.toggle('active', si===i));
    tidx = i;
  }
  const prev = document.getElementById('tPrev');
  const next = document.getElementById('tNext');
  if(tslides.length){
    if(prev) prev.addEventListener('click', ()=>tshow((tidx-1+tslides.length)%tslides.length));
    if(next) next.addEventListener('click', ()=>tshow((tidx+1)%tslides.length));
    setInterval(()=>tshow((tidx+1)%tslides.length), 8000);
  }

  const nums = Array.from(document.querySelectorAll('[data-count]'));
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'),10);
      const suffix = el.getAttribute('data-suffix') || '';
      let cur = 0;
      const step = Math.max(1, Math.floor(target/40));
      const timer = setInterval(()=>{
        cur += step;
        if(cur >= target){ cur = target; clearInterval(timer); }
        el.textContent = cur.toLocaleString() + suffix;
      }, 25);
      io.unobserve(el);
    });
  }, {threshold: .35}) : null;
  nums.forEach(n=> io && io.observe(n));
  // FAQ accordion
  document.querySelectorAll('[data-accordion]').forEach(acc => {
    acc.querySelectorAll('.acc-item').forEach(item => {
      const btn = item.querySelector('.acc-btn');
      const panel = item.querySelector('.acc-panel');
      if(!btn || !panel) return;

      const close = () => {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        panel.style.maxHeight = '0px';
      };

      const open = () => {
        // close siblings (single-open behavior like many marketing sites)
        acc.querySelectorAll('.acc-item.open').forEach(sib => {
          if(sib !== item){
            const b = sib.querySelector('.acc-btn');
            const p = sib.querySelector('.acc-panel');
            sib.classList.remove('open');
            if(b) b.setAttribute('aria-expanded','false');
            if(p) p.style.maxHeight = '0px';
          }
        });
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      };

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        isOpen ? close() : open();
      });

      // allow deep-link open via hash like #faq
      if(window.location.hash === '#faq'){
        // don't force open all; leave closed
      }
    });
  });

})();
