(function() 
{
    "use strict"
    const nav=document.getElementById("nav");
    window.addEventListener("scroll",()=>{
        nav.classList.toggle("stuck",window.scrollY>60);
    },{
        "passive":true
    });
    const revealTargets=document.querySelectorAll(".t-card, .stat, .lang-card, .c-card");
    const io=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting)
            {
                return;
            }
            const el=entry.target;
            const siblings=[...el.parentElement.children].filter(c=>c.className===el.className);
            const idx=siblings.indexOf(el);
            setTimeout(()=>el.classList.add('in'),idx*80);
            io.unobserve(el);
        });
    },{
        "threshold":0.1,
        "rootMargin":"0px 0px -30px 0px"
    });
    revealTargets.forEach(el=>io.observe(el));
    const guitarWrap=document.querySelector(".guitar-wrap");
    if(guitarWrap && window.innerWidth>900)
    {
        window.addEventListener("scroll",()=>{
            guitarWrap.style.transform=`translateY(${window.scrollY*0.14}px)`;
        },{
            "passive":true
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener("click",function(e)
        {
            const target=document.querySelector(this.getAttribute("href"));
            if(target)
            {
                e.preventDefault();
                target.scrollIntoView({
                    "behavior":'smooth',
                    "block":"start"
                });
            }
        });
    });
    document.querySelectorAll(".t-card").forEach(card=>{
        card.addEventListener("mousemove",function(e)
        {
            const r=this.getBoundingClientRect();
            const x=((e.clientX-r.left)/r.width-0.5)*5;
            const y=((e.clientY-r.top)/r.height-0.5)*5;
            this.style.transform=`perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
        card.addEventListener("mouseleave",function()
        {
            this.style.transform="";
        });
    });
})();