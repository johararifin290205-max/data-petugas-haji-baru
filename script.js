(() => {
const list=document.getElementById('list'), search=document.getElementById('search'), count=document.getElementById('count'), empty=document.getElementById('empty'), error=document.getElementById('error');
let docs=[];
function render(){
 const q=search.value.trim().toLocaleLowerCase('id');
 const rows=docs.filter(x=>x.judul.toLocaleLowerCase('id').includes(q));
 list.replaceChildren(); count.textContent=rows.length+' dokumen tersedia'; empty.hidden=rows.length!==0;
 rows.forEach(x=>{
  const a=document.createElement('a'); a.className='item'; a.href='./pdf/'+encodeURIComponent(x.file); a.setAttribute('download',x.namaUnduhan||x.file);
  a.innerHTML='<span class="pdf">PDF</span><span class="copy"><strong></strong><small>Dokumen PDF</small><span class="download">Unduh dokumen ↓</span></span><span class="arrow">›</span>';
  a.querySelector('strong').textContent=x.judul; list.appendChild(a);
 });
}
search.addEventListener('input',render);
fetch('./daftar.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json()}).then(d=>{if(!Array.isArray(d))throw Error('Format daftar.json tidak valid');docs=d.filter(x=>x&&typeof x.judul==='string'&&typeof x.file==='string');render()}).catch(e=>{count.textContent='Daftar dokumen gagal dimuat';error.textContent='Gagal membaca daftar.json: '+e.message;error.hidden=false});
})();