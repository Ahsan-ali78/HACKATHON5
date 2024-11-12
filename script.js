"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Import jsPDF
var jspdf_1 = require("jspdf");
// Event listener for the resume form submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Type assertion
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var EducationElement = document.getElementById('Education');
    var ExperienceElement = document.getElementById('Experience');
    var SkillsElement = document.getElementById('Skills');
    var usernameElement = document.getElementById("username");
    if (nameElement && emailElement && phoneElement && EducationElement && ExperienceElement && SkillsElement && usernameElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var Education = EducationElement.value;
        var Experience = ExperienceElement.value;
        var Skills = SkillsElement.value;
        var username_1 = usernameElement.value;
        var uniquePath = "resumes/".concat(username_1.replace(/\S+/g, ' '), "_cv.html");
        // Create resume output
        var resumeOutput_1 = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name_1, "</span></p>\n        <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p id=\"edit-Education\" class=\"editable\">").concat(Education, "</p>\n        <h3>Experience</h3>\n        <p id=\"edit-Experience\" class=\"editable\">").concat(Experience, "</p>\n        <h3>Skills</h3>\n        <p id=\"edit-Skills\" class=\"editable\">").concat(Skills, "</p>\n        ");
        // HTML download link
        var downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput_1);
        downloadLink.download = uniquePath;
        downloadLink.textContent = 'Download Your Resume (HTML)';
        // PDF download button
        var pdfButton = document.createElement('button');
        pdfButton.textContent = 'Download Your Resume (PDF)';
        pdfButton.onclick = function () {
            var pdf = new jspdf_1.jsPDF();
            pdf.html(resumeOutput_1, {
                callback: function (doc) {
                    doc.save("".concat(username_1.replace(/\S+/g, ' '), "_cv.pdf"));
                },
                x: 10,
                y: 10
            });
        };
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput_1;
            resumeOutputElement.appendChild(downloadLink);
            resumeOutputElement.appendChild(pdfButton); // Append the PDF button
            resumeOutputElement.style.display = "block"; // Ensure output is visible
        }
        else {
            console.error('One or more output elements are missing');
        }
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentvalue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "p" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentvalue;
                input_1.classList.add('editing', 'input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
