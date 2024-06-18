import { participantTemplate, successTemplate } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', submitForm);

  const addButton = document.getElementById('add');
  addButton.addEventListener('click', addParticipant);
});

let participantCount = 1;

function addParticipant() {
  participantCount++;
  const participantsFieldset = document.querySelector('.participants');
  const newParticipantHTML = participantTemplate(participantCount);
  const addButton = document.getElementById('add');
  addButton.insertAdjacentHTML('beforebegin', newParticipantHTML);
}

function submitForm(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const totalFeesAmount = totalFees();
  const adultName = document.getElementById('adult_name').value;
  const participantCount = getParticipantCount();

  const summaryMessage = successTemplate({
    name: adultName,
    count: participantCount,
    totalFees: totalFeesAmount
  });

  // Hide the form
  const form = document.querySelector('form');
  form.classList.add('hide');

  // Show the summary message
  const summary = document.getElementById('summary');
  summary.innerHTML = summaryMessage;
  summary.classList.remove('hide');
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements]; // Convert NodeList to Array

  const total = feeElements.reduce((sum, feeElement) => {
    const feeValue = parseFloat(feeElement.value) || 0;
    return sum + feeValue;
  }, 0);

  return total;
}

function getParticipantCount() {
  const participants = document.querySelectorAll('fieldset.participants section');
  return participants.length;
}