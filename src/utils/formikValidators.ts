const emailRegex =
  /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@gmail\.com$/;

const wrongEmailMessage =
  "Invalid Email format it should contain valid email address eg: alexdadario@gmail.com";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const wrongPasswordMessage =
  "Password should be minimum 8 length and must have One Uppercase,One Lowercase,One Digit Number,One Special Character";

export { emailRegex, wrongEmailMessage, passwordRegex, wrongPasswordMessage };
