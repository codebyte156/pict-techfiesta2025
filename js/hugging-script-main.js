import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4HYrucSTLrP3e9MPfiRfCRj003lKxtDU",
    authDomain: "safety-reports-pict.firebaseapp.com",
    projectId: "safety-reports-pict",
    storageBucket: "safety-reports-pict.firebasestorage.app",
    messagingSenderId: "976553129981",
    appId: "1:976553129981:web:1e85d6202bf2e8d4d94b94",
    measurementId: "G-SQ8505FPMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('incidentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const incidentType = document.getElementById('incidentType').value;
    const location = document.getElementById('location').value;
    const dateOfIncident = document.getElementById('dateOfIncident').value;
    const victimname = document.getElementById('victimname').value;
    const victimage = document.getElementById('victimage').value;
    const phydescriptionvictim = document.getElementById('phydescriptionvictim').value;
    const injuriesorharm = document.getElementById('injuriesorharm').value;
    const accusedname = document.getElementById('accusedname').value;
    const accuseddescription = document.getElementById('accuseddescription').value;
    const accusedrelationship = document.getElementById('accusedrelationship').value;
    const accusedaddresscontact = document.getElementById('accusedaddresscontact').value;
    const weapons = document.getElementById('weapons').value;
    const eventsequence = document.getElementById('eventsequence').value;
    const witnesses = document.getElementById('witnesses').value;
    const modeofcrime = document.getElementById('modeofcrime').value;
    const damage = document.getElementById('damage').value;
    const laws = document.getElementById('laws').value;
    const evidence = document.getElementById('evidence').value;
    const complainantdetails = document.getElementById('complainantdetails').value;
    const complainantnumber = document.getElementById('complainantnumber').value;
    const complainantaddress = document.getElementById('complainantaddress').value;
    const dateandtimeofreport = document.getElementById('dateandtimeofreport').value;

    if (incidentType && location && dateOfIncident) {
        const prompt = `Incident involving ${incidentType}. 
        The place of incident is ${location} and the date is ${dateOfIncident}. 

        Victim Details:  
        Name: ${victimname}, Age: ${victimage}, Physical Description: ${phydescriptionvictim}, Injuries or Harm: ${injuriesorharm}.  

        Accused Details:  
        Name: ${accusedname}, Description: ${accuseddescription}, Relationship with Victim: ${accusedrelationship},  
        Address & Contact: ${accusedaddresscontact}.  

        Crime Details:  
        Weapons Used: ${weapons}, Mode of Crime: ${modeofcrime}, Event Sequence: ${eventsequence}.  

        Witnesses: ${witnesses}.  
        Damage/Loss: ${damage}.  

        Legal Aspects:  
        Relevant Laws: ${laws}, Evidence Collected: ${evidence}.  

        Complainant Details:  
        Name: ${complainantdetails}, Contact Number: ${complainantnumber}, Address: ${complainantaddress}.  

        Report Details:  
        Date & Time of Report: ${dateandtimeofreport}.`;

        await generateReport(prompt);

        document.getElementById('getHelpButton').style.display = 'inline-block';
    } else {
        alert('Please fill out all the details before generating the report.');
    }
});

document.getElementById('getHelpButton').addEventListener('click', async function () {
    const incidentType = document.getElementById('incidentType').value;
    const helpPrompt = `Write measures for ${incidentType} incident.`;
    await generateReport(helpPrompt, true);
});

document.getElementById('confirmReportButton').addEventListener('click', function () {
    alert('Report confirmed and sent!');
});

document.getElementById('gpsLocationButton').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                alert(`GPS Location:\nLatitude: ${latitude}\nLongitude: ${longitude}`);
            },
            () => {
                alert('Unable to retrieve location.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});









// Voice-to-Text functionality
const voiceButtons = document.querySelectorAll('.voice-btn');

voiceButtons.forEach(button => {
    button.addEventListener('click', function () {
        const targetInput = document.getElementById(this.getAttribute('data-target'));
        startVoiceRecognition(targetInput);
    });
});

function startVoiceRecognition(inputElement) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        inputElement.value = transcript;
    };

    recognition.onerror = function () {
        alert('Voice recognition error, please try again.');
    };

    recognition.start();
}

async function generateReport(prompt, isHelp = false) {
    const apiUrl = 'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct';
    const token = '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';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        inputs: prompt,
        parameters: { "max_new_tokens": 300 },
        task: "text-generation"
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const data = await response.json();
        const generatedText = data[0]?.generated_text || 'Error: Unable to generate the report.';

        document.getElementById('reportContent').innerHTML = formatReportText(generatedText);

        if (isHelp) {
            document.getElementById('generatedReport').scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('generatedReport').style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching data from Hugging Face API:', error);
    }
}

function formatReportText(text) {
    const paragraphs = text.split('\n').map(p => `<p>${p.trim()}</p>`).join('');
    return paragraphs;
}

// Add images functionality
document.getElementById('addImageButton').addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function (event) {
            const imgElement = document.createElement('img');
            imgElement.src = event.target.result;
            imgElement.style.maxWidth = '100%';
            imgElement.style.margin = '10px 0';

            document.getElementById('reportContent').appendChild(imgElement);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    fileInput.click();
});

// Download PDF functionality
document.getElementById('downloadPDFButton').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const reportContent = document.getElementById('reportContent');
    const textContent = reportContent.innerText || reportContent.textContent;

    const margins = { top: 20, left: 10, bottom: 10 };
    let yPosition = margins.top;
    const lineHeight = 10;

    // Add the title, date, and description to the PDF
    doc.text("Incident Report", margins.left, yPosition);
    yPosition += lineHeight;

    const headerText = `Incident Type: ${document.getElementById('incidentType').value}
    Location: ${document.getElementById('location').value}
    Date: ${document.getElementById('dateOfIncident').value}`;
    
    doc.text(headerText, margins.left, yPosition);
    yPosition += lineHeight * 2;  // Spacing before description

    // Add the generated report content
    const generatedReportText = document.getElementById('reportContent').innerText || document.getElementById('reportContent').textContent;
    doc.text(generatedReportText, margins.left, yPosition);
    yPosition += lineHeight * 2;  // Additional space after generated text

    // Add images if they exist
    const images = reportContent.getElementsByTagName('img');
    let imageYPosition = yPosition + 20;  // Space after text

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imgData = img.src;

        // Check if image exceeds page height and create a new page
        if (imageYPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();  // Create a new page
            imageYPosition = margins.top;  // Reset image position to top of the new page
        }

        // Insert each image into the PDF with dynamic Y-position
        doc.addImage(imgData, 'JPEG', margins.left, imageYPosition, 50, 60); // Adjust x, y, width, height as needed
        imageYPosition += 10; // Adjust vertical spacing after each image
    }

    // Save the PDF
    doc.save('incident_report.pdf');
});



function toggleMenu() {
    document.getElementById("navbar").classList.toggle("show");
}

const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");
