document.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.id==='management-company')document.querySelector('#management-dialog')?.showModal();});
