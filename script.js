const loadData = [
    { name: 'หลอดไฟ LED', power: 12 },
    { name: 'เครื่องฟอกอากาศ', power: 20 },
    { name: 'TV 32 นิ้ว', power: 70 },
    { name: 'หม้อหุงข้าว', power: 600 },
    { name: 'ไมโครเวฟ', power: 800 },
    { name: 'หม้อทอดไร้น้ำมัน', power: 1000 }
];

let selectedRoomSize = 0;
let totalPower = 0;
let selectedPanelSize = 0;
let selectedPanelQuantity = 0;
let selectedInverter = 0;
let selectedBattery = 0;
let totalPanelCost = 0;
let totalInverterCost = 0;
let totalBatteryCost = 0;

function chooseRoomSize(size) {
    selectedRoomSize = size;
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    populateLoadForm();
}

function populateLoadForm() {
    const form = document.getElementById('loadForm');
    form.innerHTML = '';
    loadData.forEach(load => {
        const label = document.createElement('label');
        label.textContent = `${load.name} (${load.power}W)`;
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.value = load.power;
        inputCheckbox.name = load.name;
        inputCheckbox.id = load.name;

        const inputQuantity = document.createElement('input');
        inputQuantity.type = 'number';
        inputQuantity.min = '1';
        inputQuantity.value = '0';
        inputQuantity.name = `${load.name}_quantity`;
        inputQuantity.id = `${load.name}_quantity`;

        form.appendChild(label);
        form.appendChild(inputCheckbox);
        form.appendChild(inputQuantity);
        form.appendChild(document.createElement('br'));
    });
}

function calculatePower() {
    const form = document.getElementById('loadForm');
    const formData = new FormData(form);
    totalPower = 0;
    loadData.forEach(load => {
        const isChecked = formData.get(load.name);
        if (isChecked) {
            const quantity = parseInt(formData.get(`${load.name}_quantity`), 10);
            totalPower += load.power * quantity;
        }
    });

    const energyCostPerHour = totalPower / 1000 * 4.18; 

    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('powerResults').innerHTML = `
        <p><strong>Total Power Usage:</strong> ${totalPower} W/Hr</p>
        <p><strong>Energy Cost per Hour:</strong> ${energyCostPerHour.toFixed(2)} ฿/Hr </p>
    `;
}

function selectSolarPanel(size) {
    const quantityInput = size === 250 ? document.getElementById('panel250Quantity') : document.getElementById('panel550Quantity');
    const quantity = parseInt(quantityInput.value, 10);
    const costPerPanel = size === 250 ? 3700 : 4200;
    selectedPanelSize = size;
    selectedPanelQuantity = quantity;
    totalPanelCost = costPerPanel * quantity;
    
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
    document.getElementById('panelResults').innerHTML = `
        <p><strong>Selected Panel Size:</strong> ${selectedPanelSize} W</p>
        <p><strong>Number of Panels:</strong> ${selectedPanelQuantity}</p>
        <p><strong>Total Panel Cost:</strong> ${totalPanelCost} ฿</p>
    `;
}

function selectInverterBattery(inverter, battery) {
    const inverterCost = inverter === 3000 ? 1990 : 3000;
    const batteryCost = battery === 300 ? 3500 : 7800;
    selectedInverter = inverter;
    selectedBattery = battery;
    totalInverterCost = inverterCost;
    totalBatteryCost = batteryCost;

    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'block';

    const totalCost = totalPanelCost + totalInverterCost + totalBatteryCost;

    document.getElementById('summaryResults').innerHTML = `
        <p><strong>Total Power Usage:</strong> ${totalPower} W/Hr</p>
        <p><strong>Selected Panel Size:</strong> ${selectedPanelSize} W</p>
        <p><strong>Number of Panels:</strong> ${selectedPanelQuantity}</p>
        <p><strong>Total Panel Cost:</strong> ${totalPanelCost} ฿</p>
        <p><strong>Selected Inverter Size:</strong> ${selectedInverter} W</p>
        <p><strong>Total Inverter Cost:</strong> ${totalInverterCost} ฿</p>
        <p><strong>Selected Battery Size:</strong> ${selectedBattery} Wh</p>
        <p><strong>Total Battery Cost:</strong> ${totalBatteryCost} ฿</p>
        <p><strong>Total Installation Cost:</strong> ${totalCost} ฿</p>
    `;
}

function resetCalculator() {
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'none';
    document.getElementById('loadForm').innerHTML = '';
    
    selectedRoomSize = 0;
    totalPower = 0;
    selectedPanelSize = 0;
    selectedPanelQuantity = 0;
    totalPanelCost = 0;
    selectedInverter = 0;
    selectedBattery = 0;
    totalInverterCost =  0;
}

resetCalculator();