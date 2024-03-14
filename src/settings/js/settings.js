document.getElementById('settings-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('email').value;
      const age = document.getElementById('age').value;
      const income = document.getElementById('income').value;



      alert('Settings saved successfully!');
});