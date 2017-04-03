import Person from "./person";

let person = new Person("David", "Kulkarni");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();