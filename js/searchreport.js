// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Firebase configuration
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

// Event listener for searching a report
document.getElementById("searchReportButton").addEventListener("click", async () => {
    const reportId = document.getElementById("searchReportId").value;

    if (reportId) {
        try {
            const docRef = doc(db, "reports", reportId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                // Create the formatted HTML with centered content
                const formattedReport = `
                <div class="report-container">
                    <p><strong>Report ID:</strong> ${reportId}</p>
                    <p><strong>Incident Type:</strong> ${data.incidentType}</p>
                    <p><strong>Location:</strong> ${data.location}</p>
                    <p><strong>Date of Incident:</strong> ${data.dateOfIncident}</p>

                    <h3>Victim Details</h3>
                    <p><strong>Name:</strong> ${data.victimname}</p>
                    <p><strong>Age:</strong> ${data.victimage}</p>
                    <p><strong>Physical Description:</strong> ${data.phydescriptionvictim}</p>
                    <p><strong>Injuries:</strong> ${data.injuriesorharm}</p>

                    <h3>Accused Details</h3>
                    <p><strong>Name:</strong> ${data.accusedname}</p>
                    <p><strong>Description:</strong> ${data.accuseddescription}</p>
                    <p><strong>Relationship:</strong> ${data.accusedrelationship}</p>
                    <p><strong>Contact/Address:</strong> ${data.accusedaddresscontact}</p>

                    <h3>Crime Details</h3>
                    <p><strong>Weapons Used:</strong> ${data.weapons}</p>
                    <p><strong>Mode of Crime:</strong> ${data.modeofcrime}</p>
                    <p><strong>Sequence of Events:</strong><br>${data.eventsequence}</p>
                    <p><strong>Witnesses:</strong> ${data.witnesses}</p>
                    <p><strong>Damage Caused:</strong> ${data.damage}</p>

                    <h3>Legal Details</h3>
                    <p><strong>Relevant Laws:</strong> ${data.laws}</p>
                    <p><strong>Evidence Collected:</strong> ${data.evidence}</p>

                    <h3>Complainant Details</h3>
                    <p><strong>Name:</strong> ${data.complainantdetails}</p>
                    <p><strong>Contact Number:</strong> ${data.complainantnumber}</p>
                    <p><strong>Address:</strong> ${data.complainantaddress}</p>

                    <h3>Report Information</h3>
                    <p><strong>Reported At:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
                    <p><strong>Date & Time of Report:</strong> ${data.dateandtimeofreport}</p>
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
