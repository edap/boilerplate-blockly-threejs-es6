import Person from "./person";

let person = new Person("Dave", "Prati");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();