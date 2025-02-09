// Firebase Code and connectivity------------------------------------------------------------------------

// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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


// Handle Confirm Report & Send
document.getElementById("confirmReportButton").addEventListener("click", async () => {
    const incidentType = document.getElementById("incidentType").value;
    const location = document.getElementById("location").value;
    const dateOfIncident = document.getElementById("dateOfIncident").value;
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
        try {
            const docRef = await addDoc(collection(db, "reports"), {
                incidentType,
                location,
                dateOfIncident, victimname, victimage, phydescriptionvictim, injuriesorharm, accusedname, accusedname,
                accuseddescription, accusedrelationship, accusedaddresscontact, weapons, eventsequence, witnesses, modeofcrime,
                damage, laws, evidence, complainantdetails, complainantnumber, complainantaddress, dateandtimeofreport,
                timestamp: new Date().toISOString(),
            });
            alert(`Report submitted successfully! Your Report ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        alert("Please fill in all fields.");
    }
});




// Form Filling Logic------------------------------------------------------------------------------------

document.getElementById('incidentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const incidentType = document.getElementById("incidentType").value;
    const location = document.getElementById("location").value;
    const dateOfIncident = document.getElementById("dateOfIncident").value;
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
    

    if (incidentType && location && dateOfIncident ) {
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
        Date & Time of Report: ${dateandtimeofreport}.

        only give output once
        `;
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





// DO NOT MAKE ANY CHANGES AFTER THIS------------------------------------------------------------------------------


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
            imgElement.src = event.target.result; // Base64 string
            imgElement.style.maxWidth = '100%';
            imgElement.style.margin = '10px 0';

            // Debug: Log the Base64 data
            console.log("Image Base64 Data: ", imgElement.src);

            // Append image to the report content div
            document.getElementById('reportContent').appendChild(imgElement);
        };

        if (file) {
            reader.readAsDataURL(file); // Convert image to Base64
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

    const pageWidth = doc.internal.pageSize.width;
    const margins = { top: 20, left: 10, right: 10 };
    let yPosition = margins.top;
    const lineHeight = 10;

    // 1. Generate Image PDF
    const imageDoc = new jsPDF();
    const imageWidth = 180; // Width of the image in the PDF
    const imageHeight = 120; // Height of the image in the PDF
    const pageHeight = imageDoc.internal.pageSize.height;

    // Add the title
    doc.setFontSize(16);
    doc.text("Incident Report", pageWidth / 2, yPosition, { align: "center" });
    yPosition += lineHeight * 2;

    // Add the incident details
    const headerText = `Incident Type: ${document.getElementById('incidentType').value}
    Location: ${document.getElementById('location').value}
    Date: ${document.getElementById('dateOfIncident').value}`;
    doc.setFontSize(12);
    const headerLines = doc.splitTextToSize(headerText, pageWidth - margins.left - margins.right);
    doc.text(headerLines, margins.left, yPosition);
    yPosition += headerLines.length * lineHeight + 5;

    // Add images from reportContent div
    const images = reportContent.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imgData = img.src; // Base64 image data

        // Debug: Log the Base64 string
        console.log("Adding Image to PDF: ", imgData);


        // Insert the image into the PDF
        doc.addImage(imgData, 'JPEG', margins.left, yPosition, 50, 60); // Adjust dimensions as needed
        yPosition += 70; // Add spacing after the image
    }

// For making Images.pdf file   
    
    if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const imgData = img.src;

            // Add the image to the page
            imageDoc.addImage(imgData, 'JPEG', margins.left, margins.top, imageWidth, imageHeight);

            // If it's not the last image, add a new page
            if (i < images.length - 1) {
                imageDoc.addPage();
            }
        }

        // Save Image PDF
        imageDoc.save('incident_images.pdf');
    } 
    else {
        alert('No images to save in the image PDF.');
    }
    

    // Save the PDF
    doc.save('incident_report.pdf');
});

