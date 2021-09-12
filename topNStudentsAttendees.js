let studentAttendences = new Map();

/**
 * topNStudentsAttendees has the top n students who attend the most lectures
 * @param {any} students - An array of the names of all students who registered for the course (no duplicate names)
 * @param {any} attendees - A 2D array - each row represents a different lecture, and it’s content is an array of the attendees (i.e attendees[0] is an array of names who attend lecture #0)
 * @param {any} n - The number of top students to return
 */
const topNStudentsAttendees = (students, attendees, n) => {
    let _students = students.slice();
    mapAttendences(_students, attendees);
    orderStudentsByAttendence(_students);
    return _students.slice(0,n);
}

/**
 * The function maps each student with his attendences count.
 * @param {any} students -  An array of the names of all students who registered for the course (no duplicate names)
 * @param {any} attendees - A 2D array - each row represents a different lecture, and it’s content is an array of the attendees (i.e attendees[0] is an array of names who attend lecture #0)
 */
function mapAttendences(students, attendees) {
    for (let student of students) {
        studentAttendences.set(student, countAttendences(student, attendees));
    }
}

/**
 * The function receives a student array and returns an array that is organized by their attendence in a descending order.
 * @param {any} students - An array of the names of all students who registered for the course (no duplicate names)
 */
function orderStudentsByAttendence(students) {
    quicksort(students, 0, students.length-1); 
}

/**
 * The function sorts array of students by their attendences, in a decreasing order.
 * @param {any} students - The array to be sorted, that contains the names of all students who registered for the course (no duplicate names)
 * @param {any} p - array sorting start point
 * @param {any} r - array sorting end point
 */
function quicksort(students, p, r) {
    if (p < r) {
        let q = partition(students, p, r);
        quicksort(students, p, q - 1);
        quicksort(students, q + 1, r);
    }
}

/**
 * The function re organizes array of students by their attendences, in a decreasing order.
 * @param {any} students - The array to be sorted, that contains the names of all students who registered for the course (no duplicate names)
 * @param {any} p - array sorting start point
 * @param {any} r - array sorting end point
 */
function partition(students, p, r) {
    x = students[r];
    i = p - 1;
    for (j = p; j <= r - 1; j++) {
        if (studentAttendences.get(students[j]) >= studentAttendences.get(x)) {
            i++;
            [students[i], students[j]] = [students[j], students[i]];
        }
    }
    [students[i + 1], students[r]] = [students[r], students[i + 1]];
    return i + 1;
}

/**
 * countAttendences returns the attendences count of a single student in lectures.
 * @param {any} singleStudent - The student that his attendences will be counted
 * @param {any} attendees - A 2D array - each row represents a different lecture, and it’s content is an array of the attendees (i.e attendees[0] is an array of names who attend lecture #0)
 */
function countAttendences(singleStudent, attendees) {
    let attendences = 0;
    for (lecture = 0; lecture < attendees.length; lecture++) {
        if (attendees[lecture].includes(singleStudent)) {
            attendences++;
        }
    }
    return attendences;
}

function main() {
    let myStudentList = ['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas'];
    let myAttendees = [['Eden', 'Refael', 'Yoni', 'Nitzan', 'Hadas', 'Ortal'],
    ['Berry', 'Nitzan', 'Yoni', 'Eden', 'Hadas', 'Ortal'],
    ['Maxim', 'Ortal', 'Yoni', 'Refael', 'Nitzan', 'Alex'],
    ['Eden', 'Andrew', 'Yoni', 'Nitzan', 'Ortal', 'Nitzan']];
    let top3 = topNStudentsAttendees(myStudentList, myAttendees, 3);

    console.log('myStudentList: ' +JSON.stringify(myStudentList));
    console.log('myAttendees: ' + JSON.stringify(myAttendees));
    console.log('top 3 Students Attendees are: ' + top3);
}

window.onload = main();
