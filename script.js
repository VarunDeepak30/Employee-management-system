// =====================================================
// EMPLOYEE MANAGEMENT SYSTEM
// =====================================================

// API URL
const API_URL = "https://dummyjson.com/users";

// Store all employees
    let employees = [
    {
        id: 1,
        name: "Varun Deepak",
        age: 25,
        email: "varundeepak2@gmail.com",
        phone: "9876543210",
        department: "IT",
        salary: 55000,
        image: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: 2,
        name: "Varshitha Kuna",
        age: 25,
        email: "varshitha25@gmail.com",
        phone: "9876543211",
        department: "HR",
        salary: 52000,
        image: "https://i.pravatar.cc/150?img=13"
    },
    {
        id: 3,
        name: "Hari Priya",
        age: 26,
        email: "haripriya8@gmail.com",
        phone: "9876543212",
        department: "Finance",
        salary: 58000,
        image: "https://i.pravatar.cc/150?img=14"
    },
    {
        id: 4,
        name: "Pranitha",
        age: 24,
        email: "pranitha4@gmail.com",
        phone: "9876543213",
        department: "Marketing",
        salary: 48000,
        image: "https://i.pravatar.cc/150?img=15"
    },
    {
        id: 5,
        name: "Navya",
        age: 27,
        email: "navya35@gmail.com",
        phone: "9876543214",
        department: "IT",
        salary: 62000,
        image: "https://i.pravatar.cc/150?img=16"
    },
    {
        id: 6,
        name: "Sanju",
        age: 28,
        email: "sanju15@gmail.com",
        phone: "9876543215",
        department: "Finance",
        salary: 57000,
        image: "https://i.pravatar.cc/150?img=17"
    },
    {
        id: 7,
        name: "Hemanth",
        age: 29,
        email: "hemanth11@gmail.com",
        phone: "9876543216",
        department: "IT",
        salary: 65000,
        image: "https://i.pravatar.cc/150?img=18"
    },
    {
        id: 8,
        name: "Rahul Sharma",
        age: 30,
        email: "rahul@gmail.com",
        phone: "9876543217",
        department: "HR",
        salary: 54000,
        image: "https://i.pravatar.cc/150?img=19"
    },
    {
        id: 9,
        name: "Priya Reddy",
        age: 26,
        email: "priya@gmail.com",
        phone: "9876543218",
        department: "IT",
        salary: 59000,
        image: "https://i.pravatar.cc/150?img=20"
    },
    {
        id: 10,
        name: "Arjun Kumar",
        age: 31,
        email: "arjun@gmail.com",
        phone: "9876543219",
        department: "Finance",
        salary: 61000,
        image: "https://i.pravatar.cc/150?img=21"
    },
    {
        id: 11,
        name: "Sneha Rani",
        age: 25,
        email: "sneha@gmail.com",
        phone: "9876543220",
        department: "Marketing",
        salary: 51000,
        image: "https://i.pravatar.cc/150?img=22"
    },
    {
        id: 12,
        name: "Rohit Verma",
        age: 32,
        email: "rohit@gmail.com",
        phone: "9876543221",
        department: "IT",
        salary: 68000,
        image: "https://i.pravatar.cc/150?img=23"
    },
    {
        id: 13,
        name: "Anjali Rao",
        age: 27,
        email: "anjali@gmail.com",
        phone: "9876543222",
        department: "HR",
        salary: 53000,
        image: "https://i.pravatar.cc/150?img=24"
    },
    {
        id: 14,
        name: "Kiran Reddy",
        age: 29,
        email: "kiran@gmail.com",
        phone: "9876543223",
        department: "Finance",
        salary: 60000,
        image: "https://i.pravatar.cc/150?img=25"
    },
    {
        id: 15,
        name: "Pooja Singh",
        age: 24,
        email: "pooja@gmail.com",
        phone: "9876543224",
        department: "Marketing",
        salary: 49000,
        image: "https://i.pravatar.cc/150?img=26"
    }
];


// Store current department filter
let selectedDepartment = "All";


// =====================================================
// DOM ELEMENTS
// =====================================================

const employeeList = document.getElementById("employeeList");
const employeeCount = document.getElementById("employeeCount");
const totalSalary = document.getElementById("totalSalary");
const averageSalary = document.getElementById("averageSalary");
const highestSalary = document.getElementById("highestSalary");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const departmentButtons =
  document.querySelectorAll(".filter-btn");

const sortSelect = document.getElementById("sortSelect");

const resultText = document.getElementById("resultText");
const emptyMessage = document.getElementById("emptyMessage");

const status = document.getElementById("status");
const dateTime = document.getElementById("dateTime");

const employeeForm = document.getElementById("employeeForm");


// =====================================================
// 1. DISPLAY DATE AND TIME
// =====================================================

function updateDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    dateTime.textContent =
        `Today: ${date} | Time: ${time}`;
}


// Update every second
setInterval(updateDateTime, 1000);

updateDateTime();


// =====================================================
// 2. FETCH EMPLOYEES FROM API
// =====================================================

async function fetchEmployees() {
 try {

        status.textContent = "Loading employees...";

        const response = await fetch(API_URL);

        // Check if API response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        // Convert response into JSON
        const data = await response.json();

        // DummyJSON users
        employees = data.users.map((user) => {

            return {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                age: user.age,
                email: user.email,
                phone: user.phone,
                department: user.company?.department || "IT",
                image: user.image,

                // API does not provide salary
                // so we generate a sample salary
                salary: Math.floor(
                    Math.random() * 50000
                ) + 30000
            };

        });

        status.textContent =
            `${employees.length} employees loaded`;

        displayEmployees();

    } catch (error) {

        console.error(error);

        status.textContent =
            "Error loading employees";

        employeeList.innerHTML = `
            <p>
                Unable to load employee data.
                Please check your internet connection.
            </p>
        `;
    }
}


// =====================================================
// 3. DISPLAY EMPLOYEES
// =====================================================

function displayEmployees() {

    let filteredEmployees = [...employees];

    // ---------------------------------------------
    // SEARCH
    // ---------------------------------------------

    const searchValue =
        searchInput.value.trim().toLowerCase();

    if (searchValue !== "") {

        filteredEmployees = filteredEmployees.filter(
            (employee) =>
                employee.name
                    .toLowerCase()
                    .includes(searchValue)
        );
    }


    // ---------------------------------------------
    // DEPARTMENT FILTER
    // ---------------------------------------------

    if (selectedDepartment !== "All") {

        filteredEmployees =
            filteredEmployees.filter(
                (employee) =>
                    employee.department === selectedDepartment
            );
    }


    // ---------------------------------------------
    // SORT
    // ---------------------------------------------

    const sortValue = sortSelect.value;

    if (sortValue === "name-asc") {

        filteredEmployees.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (sortValue === "name-desc") {

        filteredEmployees.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    } else if (sortValue === "age-asc") {

        filteredEmployees.sort(
            (a, b) => a.age - b.age
        );

    } else if (sortValue === "age-desc") {

        filteredEmployees.sort(
            (a, b) => b.age - a.age
        );

    } else if (sortValue === "salary-asc") {

        filteredEmployees.sort(
            (a, b) => a.salary - b.salary
        );

    } else if (sortValue === "salary-desc") {

        filteredEmployees.sort(
            (a, b) => b.salary - a.salary
        );
    }


    // ---------------------------------------------
    // CLEAR OLD CARDS
    // ---------------------------------------------

    employeeList.innerHTML = "";


    // ---------------------------------------------
    // NO EMPLOYEES
    // ---------------------------------------------

    if (filteredEmployees.length === 0) {

        emptyMessage.classList.remove("hidden");

    } else {

        emptyMessage.classList.add("hidden");

        filteredEmployees.forEach(
            (employee) => {

                const card =
                    createEmployeeCard(employee);

                employeeList.appendChild(card);
            }
        );
    }


    // ---------------------------------------------
    // UPDATE RESULT TEXT
    // ---------------------------------------------

    resultText.textContent =
        `${filteredEmployees.length} employees shown`;


    // ---------------------------------------------
    // UPDATE STATISTICS
    // ---------------------------------------------

    updateStatistics(filteredEmployees);
}


// =====================================================
// 4. CREATE EMPLOYEE CARD
// =====================================================

function createEmployeeCard(employee) {

    const card =
        document.createElement("div");

    card.className = "employee-card";

    card.innerHTML = `

        <img
            src="${employee.image}"
            alt="${employee.name}"
        >

        <h3>${employee.name}</h3>

        <p>
            <strong>Age:</strong>
            ${employee.age}
        </p>

        <p>
            <strong>Email:</strong>
            ${employee.email}
        </p>

        <p>
            <strong>Phone:</strong>
            ${employee.phone || "Not available"}
        </p>

        <p>
            <strong>Department:</strong>
            ${employee.department}
        </p>

        <p>
            <strong>Salary:</strong>
            ₹${employee.salary.toLocaleString()}
        </p>

        <div class="card-actions">

            <button
                class="delete-btn"
                onclick="deleteEmployee(${employee.id})"
            >
                Delete
            </button>

        </div>
    `;

    return card;
}


// =====================================================
// 5. UPDATE STATISTICS
// =====================================================

function updateStatistics(list) {

    // Employee count
    employeeCount.textContent = list.length;


    // If no employees
    if (list.length === 0) {

        totalSalary.textContent = "₹0";

        averageSalary.textContent = "₹0";

        highestSalary.textContent = "--";

        return;
    }


    // ---------------------------------------------
    // REDUCE - TOTAL SALARY
    // ---------------------------------------------

    const salaryTotal = list.reduce(
        (total, employee) =>
            total + employee.salary,
        0
    );

    totalSalary.textContent =
        `₹${salaryTotal.toLocaleString()}`;


    // ---------------------------------------------
    // AVERAGE SALARY
    // ---------------------------------------------

    const average =
        salaryTotal / list.length;

    averageSalary.textContent =
        `₹${Math.round(average).toLocaleString()}`;


    // ---------------------------------------------
    // HIGHEST SALARY
    // ---------------------------------------------

    const highest =
        list.reduce(
            (highestEmployee, employee) => {

                return employee.salary >
                    highestEmployee.salary
                    ? employee
                    : highestEmployee;

            }
        );

    highestSalary.textContent =
        `${highest.name} - ₹${highest.salary.toLocaleString()}`;
}


// =====================================================
// 6. DELETE EMPLOYEE
// =====================================================

function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );

    if (!confirmDelete) {
        return;
    }

    employees =
        employees.filter(
            (employee) =>
                employee.id !== id
        );

    displayEmployees();

    status.textContent =
        "Employee deleted successfully";
}


// =====================================================
// 7. SEARCH BUTTON
// =====================================================

searchBtn.addEventListener(
    "click",
    () => {

        displayEmployees();

    }
);


// =====================================================
// 8. SEARCH USING ENTER KEY
// =====================================================

searchInput.addEventListener(
    "keyup",
    (event) => {

        if (event.key === "Enter") {

            displayEmployees();

        }
    }
);


// =====================================================
// 9. DEPARTMENT FILTER
// =====================================================

departmentButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                // Remove active class
                departmentButtons.forEach(
                    (btn) =>
                        btn.classList.remove("active")
                );

                // Add active class
                button.classList.add("active");

                // Get selected department
                selectedDepartment =
                    button.dataset.department;

                displayEmployees();
            }
        );
    }
);


// =====================================================
// 10. SORT EMPLOYEES
// =====================================================

sortSelect.addEventListener(
    "change",
    () => {

        displayEmployees();

    }
);


// =====================================================
// 11. ADD EMPLOYEE FORM
// =====================================================

employeeForm.addEventListener(
    "submit",
    (event) => {

        // Stop page refresh
        event.preventDefault();

        // Clear previous errors
        clearErrors();


        // ---------------------------------------------
        // GET FORM VALUES
        // ---------------------------------------------

        const name =
            document.getElementById("name")
                .value.trim();

        const age =
            Number(
                document.getElementById("age")
                    .value
            );

        const email =
            document.getElementById("email")
                .value.trim();

        const department =
            document.getElementById("department")
                .value;

        const phone =
            document.getElementById("phone")
                .value.trim();

        const salary =
            Number(
                document.getElementById("salary")
                    .value
            );


        // ---------------------------------------------
        // VALIDATION
        // ---------------------------------------------

        let isValid = true;


        // Name validation
        if (name === "") {

            document.getElementById(
                "nameError"
            ).textContent =
                "Name is required";

            isValid = false;

        } else if (name.length < 3) {

            document.getElementById(
                "nameError"
            ).textContent =
                "Name must contain at least 3 characters";

            isValid = false;
        }


        // Age validation
        if (!age) {

            document.getElementById(
                "ageError"
            ).textContent =
                "Age is required";

            isValid = false;

        } else if (age < 18 || age > 65) {

            document.getElementById(
                "ageError"
            ).textContent =
                "Age must be between 18 and 65";

            isValid = false;
        }


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            document.getElementById(
                "emailError"
            ).textContent =
                "Email is required";

            isValid = false;

        } else if (!emailPattern.test(email)) {

            document.getElementById(
                "emailError"
            ).textContent =
                "Enter a valid email";

            isValid = false;
        }


        // Department validation
        if (department === "") {

            document.getElementById(
                "departmentError"
            ).textContent =
                "Please select a department";

            isValid = false;
        }


        // Salary validation
        if (salary < 0) {

            alert(
                "Salary cannot be negative"
            );

            isValid = false;
        }


        // Stop if validation fails
        if (!isValid) {
            return;
        }


        // ---------------------------------------------
        // CREATE NEW EMPLOYEE
        // ---------------------------------------------

        const newEmployee = {

            id: Date.now(),

            name: name,

            age: age,

            email: email,

            phone:
                phone || "Not available",

            department: department,

            salary:
                salary || 0,

            image:
                "https://i.pravatar.cc/150?img=12"
        };


        // ---------------------------------------------
        // ADD TO ARRAY
        // ---------------------------------------------

        employees.push(newEmployee);


        // ---------------------------------------------
        // REFRESH DISPLAY
        // ---------------------------------------------

        displayEmployees();


        // ---------------------------------------------
        // SUCCESS MESSAGE
        // ---------------------------------------------

        document.getElementById(
            "formMessage"
        ).textContent =
            "Employee added successfully!";


        // ---------------------------------------------
        // RESET FORM
        // ---------------------------------------------

        employeeForm.reset();


        // Update status
        status.textContent =
            "New employee added";
    }
);


// =====================================================
// 12. CLEAR FORM ERRORS
// =====================================================

function clearErrors() {

    document.getElementById(
        "nameError"
    ).textContent = "";

    document.getElementById(
        "ageError"
    ).textContent = "";

    document.getElementById(
        "emailError"
    ).textContent = "";

    document.getElementById(
        "departmentError"
    ).textContent = "";

    document.getElementById(
        "formMessage"
    ).textContent = "";
}


// =====================================================
// 13. START APPLICATION
// =====================================================

displayEmployees();

