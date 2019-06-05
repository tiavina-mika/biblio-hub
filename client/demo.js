const username = "***7``'//kjfdq";
const password = "25648Rakoto";

if(!/[0-9]/.test(password)) {
    console.log('password must contain at least one number (0-9)!');
}
if(!/[a-z]/i.test(password)) {
    console.log('password must contain at least one lowercase letter (a-z)!');
}
if(!/^\w+$/.test(username)) {
    console.log('Username must contain only letters, numbers and underscores!');
}



