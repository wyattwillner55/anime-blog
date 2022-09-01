// modified from UPENN-VIRT-FSF-FT-07-2022-U-LOLC\14-MVC\01-Activities\28-Stu_Mini-Project\Main\public\js\profile.js

const profileFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#project-name').value.trim();
    const review = document.querySelector('#project-desc').value.trim();
  
    if (title && review) {
      const response = await fetch(`/api/post`, 
      {
        method: 'POST',
        body: JSON.stringify({ title, review }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete review');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', profileFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);