import Person from "./person";

let person = new Person("Ram", "Kulkarni");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();