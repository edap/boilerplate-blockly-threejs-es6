import Person from "./person";

let person = new Person("Davide", "Kulkarni");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();