// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4HYrucSTLrP3e9MPfiRfCRj003lKxtDU",
    authDomain: "safety-reports-pict.firebaseapp.com",
    projectId: "safety-reports-pict",
    storageBucket: "safety-reports-pict.appspot.com",
    messagingSenderId: "976553129981",
    appId: "1:976553129981:web:1e85d6202bf2e8d4d94b94",
    measurementId: "G-SQ8505FPMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listener for searching a report
document.getElementById("searchReportButton").addEventListener("click", async () => {
    const reportId = document.getElementById("searchReportId").value;

    if (reportId) {
        try {
            const docRef = doc(db, "reports", reportId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                // Function to format the description into paragraphs
                const formatDescription = (text, maxWordsPerLine) => {
                    const words = text.split(" ");
                    let formattedText = "";
                    for (let i = 0; i < words.length; i++) {
                        formattedText += words[i] + " ";
                        if ((i + 1) % maxWordsPerLine === 0) {
                            formattedText += "<br>";
                        }
                    }
                    return formattedText.trim();
                };

                // Format the description (limit to 8 words per line, for example)
                const formattedDescription = formatDescription(data.description, 8);

                // Create the formatted HTML with centered content
                const formattedReport = `
                <div class="report-container">
                    <p><strong>Report ID: </strong>${reportId}</p>
                    <p><strong>Incident Type:</strong> ${data.incidentType}</p>
                    <p><strong>Location:</strong> ${data.location}</p>
                    <p><strong>Date of Incident:</strong> ${data.dateOfIncident}</p>
                    <p><strong>Description:</strong><br>${formattedDescription}</p>
                    <p><strong>Reported At:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
                </div>
                `;
                document.getElementById("searchResult").innerHTML = formattedReport;
            } else {
                alert("No such report found!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    } else {
        alert("Please enter a valid Report ID.");
    }
});

// Simulating completion of tracking steps (for demo purposes)
setTimeout(() => {
    document.getElementById("step1").classList.add("completed");
    document.getElementById("connector1").classList.add("completed");

    setTimeout(() => {
        document.getElementById("step2").classList.add("completed");
        document.getElementById("connector2").classList.add("completed");

        setTimeout(() => {
            document.getElementById("step3").classList.add("completed");
            document.getElementById("connector3").classList.add("completed");

            setTimeout(() => {
                document.getElementById("step4").classList.add("completed");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);


console.log("searchreport-script.js loaded!");

function toggleMenu() {
    const nav = document.getElementById("navbar");
    nav.classList.toggle("show");
}


const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");