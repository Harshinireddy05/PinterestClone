document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Sign In attempted with:', email, password);
    alert('Sign In functionality would be implemented here.');
    window.location.href = 'main.html';
});

function showSignUp() {
    alert('Sign Up page would be shown here.');
}

function enterAsGuest() {
    alert('Entering as guest. Redirecting to main page...');
    window.location.href = 'main.html'; 
}