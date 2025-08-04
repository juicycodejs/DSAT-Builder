// Session handling functions
function saveToSession() {
    try {
        sessionStorage.setItem('appData', JSON.stringify(appData));
        
    } catch (error) {
        console.error('Error saving to session:', error);
    }
}

function loadFromSession() {
    try {
        const savedData = sessionStorage.getItem('appData');
        if (savedData) {
            appData = JSON.parse(savedData);
           
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error loading from session:', error);
        return false;
    }
}

function clearSession() {
    try {
        sessionStorage.removeItem('appData');
        
    } catch (error) {
        console.error('Error clearing session:', error);
    }
}

// Initialize app data
let appData = {
    sections: [],
    questions: [],
    scoringData: [
  { CorrectQ: 0, Scale1: 200, Scale2: 200 },
  { CorrectQ: 1, Scale1: 210, Scale2: 220 },
  { CorrectQ: 2, Scale1: 230, Scale2: 240 },
  { CorrectQ: 3, Scale1: 240, Scale2: 260 },
  { CorrectQ: 4, Scale1: 250, Scale2: 280 },
  { CorrectQ: 5, Scale1: 260, Scale2: 300 },
  { CorrectQ: 6, Scale1: 280, Scale2: 310 },
  { CorrectQ: 7, Scale1: 300, Scale2: 330 },
  { CorrectQ: 8, Scale1: 310, Scale2: 340 },
  { CorrectQ: 9, Scale1: 320, Scale2: 350 },
  { CorrectQ: 10, Scale1: 330, Scale2: 370 },
  { CorrectQ: 11, Scale1: 340, Scale2: 390 },
  { CorrectQ: 12, Scale1: 350, Scale2: 400 },
  { CorrectQ: 13, Scale1: 350, Scale2: 410 },
  { CorrectQ: 14, Scale1: 360, Scale2: 420 },
  { CorrectQ: 15, Scale1: 370, Scale2: 430 },
  { CorrectQ: 16, Scale1: 380, Scale2: 440 },
  { CorrectQ: 17, Scale1: 390, Scale2: 450 },
  { CorrectQ: 18, Scale1: 400, Scale2: 470 },
  { CorrectQ: 19, Scale1: 410, Scale2: 480 },
  { CorrectQ: 20, Scale1: 420, Scale2: 490 },
  { CorrectQ: 21, Scale1: 430, Scale2: 500 },
  { CorrectQ: 22, Scale1: 440, Scale2: 510 },
  { CorrectQ: 23, Scale1: 450, Scale2: 520 },
  { CorrectQ: 24, Scale1: 460, Scale2: 540 },
  { CorrectQ: 25, Scale1: 470, Scale2: 550 },
  { CorrectQ: 26, Scale1: 470, Scale2: 560 },
  { CorrectQ: 27, Scale1: 480, Scale2: 570 },
  { CorrectQ: 28, Scale1: 490, Scale2: 590 },
  { CorrectQ: 29, Scale1: 500, Scale2: 600 },
  { CorrectQ: 30, Scale1: 520, Scale2: 610 },
  { CorrectQ: 31, Scale1: 530, Scale2: 620 },
  { CorrectQ: 32, Scale1: 540, Scale2: 630 },
  { CorrectQ: 33, Scale1: 550, Scale2: 650 },
  { CorrectQ: 34, Scale1: 570, Scale2: 660 },
  { CorrectQ: 35, Scale1: 570, Scale2: 670 },
  { CorrectQ: 36, Scale1: 590, Scale2: 680 },
  { CorrectQ: 37, Scale1: 600, Scale2: 690 },
  { CorrectQ: 38, Scale1: 610, Scale2: 700 },
  { CorrectQ: 39, Scale1: 620, Scale2: 720 },
  { CorrectQ: 40, Scale1: 630, Scale2: 740 },
  { CorrectQ: 41, Scale1: 640, Scale2: 760 },
  { CorrectQ: 42, Scale1: 650, Scale2: 780 },
  { CorrectQ: 43, Scale1: 660, Scale2: 790 },
  { CorrectQ: 44, Scale1: 670, Scale2: 800 },
  { CorrectQ: 45, Scale1: 680, Scale2: null },
  { CorrectQ: 46, Scale1: 690, Scale2: null },
  { CorrectQ: 47, Scale1: 700, Scale2: null },
  { CorrectQ: 48, Scale1: 720, Scale2: null },
  { CorrectQ: 49, Scale1: 730, Scale2: null },
  { CorrectQ: 50, Scale1: 750, Scale2: null },
  { CorrectQ: 51, Scale1: 770, Scale2: null },
  { CorrectQ: 52, Scale1: 780, Scale2: null },
  { CorrectQ: 53, Scale1: 790, Scale2: null },
  { CorrectQ: 54, Scale1: 800, Scale2: null }
]

};

// LaTeX Library Data
const latexCategories = {
    "Math Commands": ["#ideoverline{abc}#", "#left( right)#", "#left[ right]#", "#frac{a}{b}#", "#x^{a}#", "#x^{circ}#", "#x_{b}#", "#sqrt{x}#", "#root{n}{x}#", "#log_{e} x^{2}#", "#lim_{n to infty}#", "#e^{-i theta}#", "#sum#", "#sum_{n=0}^{infty}#", "#prod#", "#prod_{n=1}^{infty}#", "#int#", "#int_{a}^{b}#", "#oint_{1}^{n}#", "#intint_{1}^{2}#", "#intintint#", "#overset{a}{X}#", "#underset{b}{X}#", "#frac{partial y}{partial x}#"],
    "Others": ["#angle#", "#bot#", "#top#", "#triangle#", "#infty#", "#nabla#", "#partial#", "#tilde{a}#", "#hat{a}#", "#bar{a}#", "#vec{a}#", "#vdots#", "#ldots#", "#cdots#", "#ddots#", "#ideunderline{abc}#", "#idehat{abc}#", "#idetilde{abc}#", "#ideoverbrace{abc}#", "#ideunderbrace{abc}#"],
    "Format Commands": ["#br</br>#", "#textbf{}#", "#textit{}#", "#underline{}#", "#text{}#"],
    "Functions": ["#sin#", "#cos#", "#tan#", "#csc#", "#sec#", "#cot#", "#arcsin#", "#arccos#", "#arctan#", "#det#", "#dim#", "#exp#", "#gcd#", "#ln#", "#log#", "#max#", "#min#", "#sinh#", "#cosh#", "#tanh#", "#csch#", "#sech#", "#coth#"],
    "Relations and Logic": ["#<#", "#>#", "#le#", "#ge#", "#=#", "#ne#", "#land#", "#lor#", "#in#", "#notin#", "#prec#", "#succ#", "#preceq#", "#succeq#", "#equiv#", "#approx#", "#cong#", "#propto#"],
    "Arrows": ["#leftarrow#", "#rightarrow#", "#Leftarrow#", "#Rightarrow#", "#leftrightarrow#", "#Leftrightarrow#", "#mapsto#", "#uparrow#", "#downarrow#"],
    "Operators": ["#pm#", "#mp#", "#times#", "#div#", "#ast#", "#star#", "#circ#", "#cdot#", "#oplus#", "#otimes#", "#odot#", "#exists#", "#forall#", "#neg#", "#emptyset#", "#subset#", "#supset#", "#subseteq#", "#supseteq#", "#cup#", "#cap#"],
    "Greek Uppercase": ["#Gamma#", "#Delta#", "#Theta#", "#Lambda#", "#Xi#", "#Pi#", "#Sigma#", "#Phi#", "#Psi#", "#Omega#"],
    "Greek Lowercase": ["#alpha#", "#beta#", "#gamma#", "#delta#", "#epsilon#", "#varepsilon#", "#zeta#", "#eta#", "#theta#", "#vartheta#", "#iota#", "#kappa#", "#lambda#", "#mu#", "#nu#", "#xi#", "#pi#", "#rho#", "#sigma#", "#tau#", "#upsilon#", "#phi#", "#varphi#", "#chi#", "#psi#", "#omega#"]
};

const categoryMap = {
    "Math Commands": "math",
    "Others": "others",
    "Format Commands": "format",
    "Functions": "functions",
    "Relations and Logic": "relations",
    "Arrows": "arrows",
    "Operators": "operators",
    "Greek Uppercase": "greek-upper",
    "Greek Lowercase": "greek-lower"
};

document.addEventListener('DOMContentLoaded', function() {
    ;
    
    // Load saved data from session if available
    if (loadFromSession()) {
        console.log('Restored previous session data');
    }
    
    initializeTabs();
    initializeModals();
    initializeForms();
    initializeLatexLibrary();
    renderSections();
    renderQuestions();
    populateSectionDropdown();
    setupLatexInputs(); 
    
    
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn--primary';
    resetButton.style.margin = '50px';
    resetButton.style.padding = '10px 20px';
    resetButton.style.alignSelf = 'center';
    resetButton.textContent = 'Reset All Data';
    resetButton.onclick = resetAllData;
    document.body.appendChild(resetButton);
    
   
    window.addEventListener('beforeunload', function() {
        saveToSession();
    });
    
    switchTab('sections');

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportToExcel();
        });
    }

    function exportToExcel() {
               fetch('/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sections: appData.sections.map(section => ({
                    ...section,
                    questions: appData.questions.filter(q => q.sectionId === section.id)
                })),
                scoringData: appData.scoringData // Add scoring data to the request
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Export failed');
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Metadata.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(err => {
            alert('Export failed: ' + err.message);
        });
    }
});

function initializeTabs() {
    
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.dataset.tab;
           
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        
    }
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(`${tabName}Content`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
       
    } else {
        console.error('Content not found for tab:', tabName);
    }
}

function initializeLatexLibrary() {
   
    
    document.querySelectorAll('.latex-category-header').forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLatexCategory(this);
        });
    });
    Object.entries(latexCategories).forEach(([categoryName, commands]) => {
        const categoryId = categoryMap[categoryName];
        populateLatexCategory(categoryId, commands);
    });
    
    
}

function toggleLatexCategory(header) {
    const category = header.dataset.category;
    const content = document.getElementById(`${category}-commands`);
    const toggle = header.querySelector('.latex-toggle');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        header.classList.remove('collapsed');
        toggle.textContent = '▼';
    } else {
        content.classList.add('hidden');
        header.classList.add('collapsed');
        toggle.textContent = '▶';
    }
}

function populateLatexCategory(categoryId, commands) {
    const container = document.querySelector(`#${categoryId}-commands .latex-commands-grid`);
    if (!container) {
        console.error('LaTeX category container not found:', categoryId);
        return;
    }
    
    container.innerHTML = commands.map(command => 
        `<button type="button" class="latex-button" onclick="insertLatexCommand('${command.replace(/'/g, "\\'")}')">${command}</button>`
    ).join('');
    
    console.log(`Populated ${categoryId} with ${commands.length} commands`);
}

let currentFocusedElement = null;

function setupLatexInputs() {
    const latexEnabledInputs = [
        'questionText',
        'optionA',
        'optionB',
        'optionC',
        'optionD',
        'optionE',
        'optionF',
        'optionG',
        'optionH',
        'optionI',
        'optionJ',
        'correctGridin'
    ];

    latexEnabledInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('focus', function() {
                currentFocusedElement = this;
            });
        }
    });
}


function insertLatexCommand(command) {
    
    
    
    const element = currentFocusedElement || document.getElementById('questionText');
    
    if (!element) {
        console.error('No target element found for LaTeX insertion');
        return;
    }
    
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const text = element.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    element.value = before + command + after;
    element.focus();
    element.setSelectionRange(start + command.length, start + command.length);
    
    
}


window.insertLatexCommand = insertLatexCommand;


function initializeModals() {
   
    
   
    setupModalButtons();
    setupModalCloseHandlers();
}

function setupModalButtons() {
    const addSectionBtn = document.getElementById('addSectionBtn');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
           
            openModal('sectionModal');
        });
        
    } else {
        console.error('Add Section button not found');
    }
    
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
           
            openModal('questionModal');
        });
        
    } else {
        console.error('Add Question button not found');
    }
}

function setupModalCloseHandlers() {
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            
            closeModal(modalId);
        });
    });
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modal = this.closest('.modal');
            if (modal) {
                
                closeModal(modal.id);
            }
        });
    });
}

function openModal(modalId) {
    
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        
        // Only reset forms when opening for new creation
        if (modalId === 'sectionModal') {
            const form = document.getElementById('sectionForm');
            if (form && !document.getElementById('sectionId').disabled) {
                // Only reset if not in edit mode (sectionId is not disabled)
                form.reset();
                console.log('Section form reset for new creation');
            }
        } else if (modalId === 'questionModal') {
            const form = document.getElementById('questionForm');
            if (form && !form.dataset.editingId) {
                // Only reset if not in edit mode (no editingId)
                form.reset();
                resetQuestionForm();
                console.log('Question form reset for new creation');
            }
            populateSectionDropdown();
        }
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        console.log('Modal closed successfully:', modalId);
        
        // Reset forms and states when closing
        if (modalId === 'sectionModal') {
            const form = document.getElementById('sectionForm');
            if (form) {
                form.reset();
                document.getElementById('sectionId').disabled = false;
            }
        } else if (modalId === 'questionModal') {
            const form = document.getElementById('questionForm');
            if (form) {
                form.reset();
                form.dataset.editingId = '';
                resetQuestionForm();
            }
        }
    } else {
        console.error('Modal not found for closing:', modalId);
    }
}


function initializeForms() {
    console.log('Initializing forms...');
    
    
    const sectionForm = document.getElementById('sectionForm');
    if (sectionForm) {
        sectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSectionSubmit(e);
        });
        console.log('Section form listener attached');
    } else {
        console.error('Section form not found');
    }
    
    
    const questionForm = document.getElementById('questionForm');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuestionSubmit(e);
        });
        console.log('Question form listener attached');
    } else {
        console.error('Question form not found');
    }
    
    
    const questionType = document.getElementById('questionType');
    if (questionType) {
        questionType.addEventListener('change', handleQuestionTypeChange);
        console.log('Question type change listener attached');
    }
}

function handleQuestionTypeChange() {
    const questionType = document.getElementById('questionType');
    if (!questionType) return;
    
    const questionTypeValue = questionType.value;
    const mcqOptions = document.getElementById('mcqOptions');
    const gridinAnswer = document.getElementById('gridinAnswer');
    
    console.log('Question type changed to:', questionTypeValue);
    
    if (questionTypeValue === 'MCQ') {
        if (mcqOptions) {
            mcqOptions.classList.remove('hidden');
            // Ensure MCQ fields are enabled
            document.getElementById('optionA').disabled = false;
            document.getElementById('optionB').disabled = false;
            document.getElementById('optionC').disabled = false;
            document.getElementById('optionD').disabled = false;
            document.getElementById('correctMCQ').disabled = false;
        }
        if (gridinAnswer) gridinAnswer.classList.add('hidden');
    } else if (questionTypeValue === 'Grid-in') {
        if (mcqOptions) mcqOptions.classList.add('hidden');
        if (gridinAnswer) {
            gridinAnswer.classList.remove('hidden');
            // Ensure Grid-in field is enabled
            document.getElementById('correctGridin').disabled = false;
        }
    } else {
        if (mcqOptions) mcqOptions.classList.add('hidden');
        if (gridinAnswer) gridinAnswer.classList.add('hidden');
    }
}

function resetQuestionForm() {
    const mcqOptions = document.getElementById('mcqOptions');
    const gridinAnswer = document.getElementById('gridinAnswer');
    
    if (mcqOptions) mcqOptions.classList.add('hidden');
    if (gridinAnswer) gridinAnswer.classList.add('hidden');
}


function handleSectionSubmit(e) {
    e.preventDefault();
    console.log('Section form submitted');
    
    try {
        const formData = {
            id: document.getElementById('sectionId').value.trim(),
            name: document.getElementById('sectionName').value.trim(),
            timer: parseInt(document.getElementById('sectionTimer').value),
            description: document.getElementById('sectionDescription').value.trim(),
            scoringScale: document.getElementById('scoringScale').value.trim(),
            numberOfQuestions: parseInt(document.getElementById('numberOfQuestions').value),
            permissions: {
                calculatorAllowed: document.getElementById('calculatorAllowed').checked,
                annotationAllowed: document.getElementById('annotationAllowed').checked,
                reviewAllowed: document.getElementById('reviewAllowed').checked,
                crossOptionAllowed: document.getElementById('crossOptionAllowed').checked
            }
        };
        
        console.log('Section form data:', formData);
        
        
        if (!formData.id || !formData.name || !formData.scoringScale) {
            alert('Please fill in all required fields.');
            return;
        }
        
        
        if (appData.sections.find(s => s.id === formData.id)) {
            alert('Section ID already exists. Please use a different ID.');
            return;
        }
        
        appData.sections.push(formData);
        console.log('Section added successfully. Total sections:', appData.sections.length);
        
        renderSections();
        populateSectionDropdown();
        closeModal('sectionModal');
        
    } catch (error) {
        console.error('Error submitting section:', error);
        alert('Error adding section. Please try again.');
    }
}

function renderSections() {
    console.log('Rendering sections...');
    const container = document.getElementById('sectionsList');
    
    if (!container) {
        console.error('Sections list container not found');
        return;
    }
    
    if (appData.sections.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No sections yet</h3>
                <p>Click "Add Section" to create your first test section.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = appData.sections.map(section => `
        <div class="section-card" data-section-id="${section.id}">
            <h3>${section.name} (${section.id})</h3>
            <div class="section-details">
                <div class="section-detail">
                    <label>Timer</label>
                    <span>${section.timer} minutes</span>
                </div>
                <div class="section-detail">
                    <label>Scoring Scale</label>
                    <span>${section.scoringScale}</span>
                </div>
                <div class="section-detail">
                    <label>Number of Questions</label>
                    <span>${section.numberOfQuestions}</span>
                </div>
                <div class="section-detail">
                    <label>Description</label>
                    <span>${section.description || 'No description'}</span>
                </div>
            </div>
            <div class="section-detail">
                <label>Permissions</label>
                <div class="permissions-list">
                    ${Object.entries(section.permissions)
                        .filter(([key, value]) => value)
                        .map(([key]) => `<span class="permission-tag">${formatPermissionName(key)}</span>`)
                        .join('')}
                    ${Object.values(section.permissions).every(v => !v) ? '<span class="permission-tag">None</span>' : ''}
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn--sm btn-edit" onclick="editSection('${section.id}')">Edit</button>
                <button class="btn btn--sm btn-delete" onclick="deleteSection('${section.id}')">Delete</button>
            </div>
        </div>
    `).join('');
    
    console.log('Sections rendered successfully');
}

function formatPermissionName(key) {
    const names = {
        calculatorAllowed: 'Calculator',
        annotationAllowed: 'Annotation',
        reviewAllowed: 'Review',
        crossOptionAllowed: 'Cross Option'
    };
    return names[key] || key;
}

window.deleteSection = function(sectionId) {
    console.log('Deleting section:', sectionId);
    if (confirm('Are you sure you want to delete this section? This will also delete all questions in this section.')) {
        try {
            appData.sections = appData.sections.filter(s => s.id !== sectionId);
            appData.questions = appData.questions.filter(q => q.sectionId !== sectionId);
            renderSections();
            renderQuestions();
            populateSectionDropdown();
            saveToSession();
            console.log('Section deleted successfully');
        } catch (error) {
            console.error('Error deleting section:', error);
            alert('Error deleting section. Please try again.');
        }
    }
};


function handleQuestionSubmit(e) {
    e.preventDefault();
    console.log('Question form submitted');
    
    try {
        const questionType = document.getElementById('questionType').value;
        const sectionId = document.getElementById('questionSection').value;
        
        if (!questionType || !sectionId) {
            alert('Please select question type and section.');
            return;
        }
        
        // Get the count of existing questions in this section
        const sectionQuestions = appData.questions.filter(q => q.sectionId === sectionId);
        const questionNumber = sectionQuestions.length + 1;
        
        const baseData = {
            id: `Q${questionNumber}`,
            type: questionType,
            sectionId: sectionId,
            questionText: document.getElementById('questionText').value.trim(),
            concepts: document.getElementById('concepts').value.trim(),
            learningStrategies: document.getElementById('learningStrategies').value.trim(),
            additionalOptions: {
                includeReadingPassage: document.getElementById('includeReadingPassage').checked,
                includeQuestionImage: document.getElementById('includeQuestionImage').checked,
                includeAnswerImages: document.getElementById('includeAnswerImages').checked
            }
        };
        
        if (questionType === 'MCQ') {
            baseData.options = {
                A: document.getElementById('optionA').value.trim(),
                B: document.getElementById('optionB').value.trim(),
                C: document.getElementById('optionC').value.trim(),
                D: document.getElementById('optionD').value.trim(),
            };
            baseData.correctAnswer = document.getElementById('correctMCQ').value;
            
            
            if (!baseData.options.A || !baseData.options.B || !baseData.options.C || !baseData.options.D || !baseData.correctAnswer) {
                alert('Please fill in all options and select the correct answer for MCQ.');
                return;
            }
        } else if (questionType === 'Grid-in') {
            baseData.correctAnswer = document.getElementById('correctGridin').value.trim();
            
            if (!baseData.correctAnswer) {
                alert('Please provide the correct answer for Grid-in question.');
                return;
            }
        }
        
        if (!baseData.questionText) {
            alert('Please enter the question text.');
            return;
        }
        
        appData.questions.push(baseData);
        console.log('Question added successfully. Total questions:', appData.questions.length);
        
        renderQuestions();
        closeModal('questionModal');
        
    } catch (error) {
        console.error('Error submitting question:', error);
        alert('Error adding question. Please try again.');
    }
}

function renderQuestions() {
    console.log('Rendering questions...');
    const container = document.getElementById('questionsList');
    
    if (!container) {
        console.error('Questions list container not found');
        return;
    }
    
    if (appData.questions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No questions yet</h3>
                <p>Click "Add Question" to create your first question.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = appData.questions.map(question => {
        const section = appData.sections.find(s => s.id === question.sectionId);
        const sectionName = section ? section.name : 'Unknown Section';
        
        return `
            <div class="question-card" data-question-id="${question.id}">
                <h3>${sectionName} - Question ${question.id} (${question.type})</h3>
                <div class="question-details">
                    <div class="question-detail">
                        <label>Section</label>
                        <span>${sectionName}</span>
                    </div>
                    <div class="question-detail">
                        <label>Type</label>
                        <span>${question.type}</span>
                    </div>
                </div>
                <div class="question-detail">
                    <label>Question Text</label>
                    <div class="question-text-display">${question.questionText}</div>
                </div>
                ${renderQuestionAnswers(question)}
                <div class="question-details">
                    <div class="question-detail">
                        <label>Concepts</label>
                        <span>${question.concepts || 'None specified'}</span>
                    </div>
                    <div class="question-detail">
                        <label>Learning Strategies</label>
                        <span>${question.learningStrategies || 'None specified'}</span>
                    </div>
                </div>
                ${renderAdditionalOptions(question.additionalOptions)}
                <div class="card-actions">
                    <button class="btn btn--sm btn-edit" onclick="editQuestion('${question.id}')">Edit</button>
                    <button class="btn btn--sm btn-delete" onclick="deleteQuestion('${question.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Questions rendered successfully');
}

function renderQuestionAnswers(question) {
    if (question.type === 'MCQ') {
        return `
            <div class="question-detail">
                <label>Answer Options</label>
                <div class="question-options">
                    ${Object.entries(question.options).map(([key, value]) => `
                        <div class="question-option ${question.correctAnswer === key ? 'correct' : ''}">
                            <span class="option-label">${key}:</span>
                            <span>${value}</span>
                            ${question.correctAnswer === key ? '<span class="correct-answer-badge">Correct</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (question.type === 'Grid-in') {
        return `
            <div class="question-detail">
                <label>Correct Answer</label>
                <span class="status--success">${question.correctAnswer}</span>
            </div>
        `;
    }
    return '';
}

function renderAdditionalOptions(options) {
    const activeOptions = Object.entries(options)
        .filter(([key, value]) => value)
        .map(([key]) => formatOptionName(key));
    
    if (activeOptions.length === 0) {
        return `
            <div class="question-detail">
                <label>Additional Options</label>
                <span>None selected</span>
            </div>
        `;
    }
    
    return `
        <div class="question-detail">
            <label>Additional Options</label>
            <div class="options-list">
                ${activeOptions.map(option => `<span class="option-tag">${option}</span>`).join('')}
            </div>
        </div>
    `;
}

function formatOptionName(key) {
    const names = {
        includeReadingPassage: 'Reading Passage',
        includeQuestionImage: 'Question Image',
        includeAnswerImages: 'Answer Images'
    };
    return names[key] || key;
}

// Global function for delete buttons
window.deleteQuestion = function(questionId) {
    console.log('Deleting question:', questionId);
    if (confirm('Are you sure you want to delete this question?')) {
        try {
            appData.questions = appData.questions.filter(q => q.id !== questionId);
            renderQuestions();
            saveToSession();
            console.log('Question deleted successfully');
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Error deleting question. Please try again.');
        }
    }
};

window.resetAllData = function() {
    if (confirm('Are you sure you want to reset all data? This will clear all sections and questions.')) {
        try {
            appData = {
                sections: [],
                questions: [],
                scoringData: appData.scoringData // Preserve scoring data
            };
            
            renderSections();
            renderQuestions();
            populateSectionDropdown();
            
            
            clearSession();
            
            console.log('All data reset successfully');
            alert('All data has been reset successfully.');
        } catch (error) {
            console.error('Error resetting data:', error);
            alert('Error resetting data. Please try again.');
        }
    }
};


window.editSection = function(sectionId) {
    console.log('Editing section:', sectionId);
    const section = appData.sections.find(s => s.id === sectionId);
    if (!section) return;

    
    document.getElementById('sectionId').value = section.id;
    document.getElementById('sectionName').value = section.name;
    document.getElementById('sectionTimer').value = section.timer;
    document.getElementById('sectionDescription').value = section.description;
    document.getElementById('scoringScale').value = section.scoringScale;
    document.getElementById('numberOfQuestions').value = section.numberOfQuestions;
    document.getElementById('calculatorAllowed').checked = section.permissions.calculatorAllowed;
    document.getElementById('annotationAllowed').checked = section.permissions.annotationAllowed;
    document.getElementById('reviewAllowed').checked = section.permissions.reviewAllowed;
    document.getElementById('crossOptionAllowed').checked = section.permissions.crossOptionAllowed;

    
    document.getElementById('sectionId').disabled = true;
    
    
    openModal('sectionModal');
};


window.editQuestion = function(questionId) {
    console.log('Editing question:', questionId);
    const question = appData.questions.find(q => q.id === questionId);
    if (!question) return;

   
    document.getElementById('questionSection').value = question.sectionId;
    document.getElementById('questionType').value = question.type;
    
   
    handleQuestionTypeChange();

    document.getElementById('questionText').value = question.questionText;
    document.getElementById('concepts').value = question.concepts;
    document.getElementById('learningStrategies').value = question.learningStrategies;
    
    document.getElementById('includeReadingPassage').checked = question.additionalOptions.includeReadingPassage;
    document.getElementById('includeQuestionImage').checked = question.additionalOptions.includeQuestionImage;
    document.getElementById('includeAnswerImages').checked = question.additionalOptions.includeAnswerImages;

    if (question.type === 'MCQ') {
        // Populate all available options (A-J)
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        letters.forEach(letter => {
            const optionElement = document.getElementById(`option${letter}`);
            if (optionElement && question.options[letter]) {
                optionElement.value = question.options[letter];
            }
        });
        document.getElementById('correctMCQ').value = question.correctAnswer;
    } else if (question.type === 'Grid-in') {
        document.getElementById('correctGridin').value = question.correctAnswer;
    }

    document.getElementById('questionForm').dataset.editingId = questionId;
    
    openModal('questionModal');
};

function handleSectionSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = {
            id: document.getElementById('sectionId').value.trim(),
            name: document.getElementById('sectionName').value.trim(),
            timer: parseInt(document.getElementById('sectionTimer').value),
            description: document.getElementById('sectionDescription').value.trim(),
            scoringScale: document.getElementById('scoringScale').value.trim(),
            numberOfQuestions: parseInt(document.getElementById('numberOfQuestions').value),
            permissions: {
                calculatorAllowed: document.getElementById('calculatorAllowed').checked,
                annotationAllowed: document.getElementById('annotationAllowed').checked,
                reviewAllowed: document.getElementById('reviewAllowed').checked,
                crossOptionAllowed: document.getElementById('crossOptionAllowed').checked
            }
        };
        
        if (!formData.id || !formData.name || !formData.scoringScale) {
            alert('Please fill in all required fields.');
            return;
        }

        const existingIndex = appData.sections.findIndex(s => s.id === formData.id);
        if (existingIndex >= 0) {
            appData.sections[existingIndex] = formData;
           
        } else {
            if (appData.sections.find(s => s.id === formData.id)) {
                alert('Section ID already exists. Please use a different ID.');
                return;
            }
            appData.sections.push(formData);
            console.log('Section added successfully');
        }

        renderSections();
        populateSectionDropdown();
        saveToSession();
        closeModal('sectionModal');
        
        document.getElementById('sectionForm').reset();
        document.getElementById('sectionId').disabled = false;
        
    } catch (error) {
        console.error('Error submitting section:', error);
        alert('Error saving section. Please try again.');
    }
}

function handleQuestionSubmit(e) {
    e.preventDefault();
    console.log('Question form submitted');
    
    try {
        const questionType = document.getElementById('questionType').value;
        const sectionId = document.getElementById('questionSection').value;
        const editingId = e.target.dataset.editingId;
        
        if (!questionType || !sectionId) {
            alert('Please select question type and section.');
            return;
        }

        const sectionQuestions = appData.questions.filter(q => q.sectionId === sectionId);
        const questionNumber = editingId ? editingId.split('Q')[1] : (sectionQuestions.length + 1);
        
        const baseData = {
            id: editingId || `Q${questionNumber}`,
            type: questionType,
            sectionId: sectionId,
            questionText: document.getElementById('questionText').value.trim(),
            concepts: document.getElementById('concepts').value.trim(),
            learningStrategies: document.getElementById('learningStrategies').value.trim(),
            additionalOptions: {
                includeReadingPassage: document.getElementById('includeReadingPassage').checked,
                includeQuestionImage: document.getElementById('includeQuestionImage').checked,
                includeAnswerImages: document.getElementById('includeAnswerImages').checked
            }
        };

        if (questionType === 'MCQ') {
            baseData.options = {};
            const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            
            // Capture all available options
            letters.forEach(letter => {
                const optionElement = document.getElementById(`option${letter}`);
                if (optionElement && optionElement.value.trim()) {
                    baseData.options[letter] = optionElement.value.trim();
                }
            });
            
            baseData.correctAnswer = document.getElementById('correctMCQ').value;
            
            // Check if we have at least 4 options and a correct answer
            const optionCount = Object.keys(baseData.options).length;
            if (optionCount < 4 || !baseData.correctAnswer) {
                alert('Please fill in at least 4 options and select the correct answer for MCQ.');
                return;
            }
        } else if (questionType === 'Grid-in') {
            baseData.correctAnswer = document.getElementById('correctGridin').value.trim();
            
            if (!baseData.correctAnswer) {
                alert('Please provide the correct answer for Grid-in question.');
                return;
            }
        }
        
        if (!baseData.questionText) {
            alert('Please enter the question text.');
            return;
        }

        if (editingId) {
            const index = appData.questions.findIndex(q => q.id === editingId);
            if (index >= 0) {
                appData.questions[index] = baseData;
                console.log('Question updated successfully');
            }
        } else {
            appData.questions.push(baseData);
            console.log('Question added successfully');
        }

        e.target.dataset.editingId = '';
        e.target.reset();
        resetQuestionForm();
        
        renderQuestions();
        saveToSession();
        closeModal('questionModal');
        
    } catch (error) {
        console.error('Error submitting question:', error);
        alert('Error saving question. Please try again.');
    }
}

function populateSectionDropdown() {
    const dropdown = document.getElementById('questionSection');
    if (!dropdown) {
        console.error('Question section dropdown not found');
        return;
    }
    
    dropdown.innerHTML = '<option value="">Select section...</option>';
    
    appData.sections.forEach(section => {
        const option = document.createElement('option');
        option.value = section.id;
        option.textContent = `${section.name} (${section.id})`;
        dropdown.appendChild(option);
    });
    
    console.log('Section dropdown populated with', appData.sections.length, 'sections');
}

// Handle MCQ options addition and removal
document.addEventListener('DOMContentLoaded', function() {
    const addOptionBtn = document.getElementById('addOptionBtn');
    const removeOptionBtn = document.getElementById('removeOptionBtn');
    const optionsGrid = document.querySelector('.options-grid');
    const correctMCQ = document.getElementById('correctMCQ');
    
    const letters = ['E', 'F', 'G', 'H', 'I', 'J'];
    let currentOptionIndex = 0;
    
    if (addOptionBtn && removeOptionBtn && optionsGrid && correctMCQ) {
        addOptionBtn.addEventListener('click', function() {
            if (currentOptionIndex < letters.length) {
                const letter = letters[currentOptionIndex];
                
                // Create new option div
                const newOption = document.createElement('div');
                newOption.innerHTML = `
                    <label class="form-label">Option ${letter}:</label>
                    <input type="text" id="option${letter}" class="form-control">
                `;
                optionsGrid.appendChild(newOption);

                // Add focus event for LaTeX insertion
                const optionInput = newOption.querySelector(`#option${letter}`);
                if (optionInput) {
                    optionInput.addEventListener('focus', function() {
                        currentFocusedElement = this;
                    });
                }
                
                // Add option to correct answer dropdown
                const newOptionElement = document.createElement('option');
                newOptionElement.value = letter;
                newOptionElement.textContent = letter;
                correctMCQ.appendChild(newOptionElement);
                
                currentOptionIndex++;
                
                // Enable remove button when we have more than 4 options
                removeOptionBtn.disabled = false;
                
                // Disable add button if we've reached the maximum
                if (currentOptionIndex >= letters.length) {
                    addOptionBtn.disabled = true;
                }
            }
        });
        
        removeOptionBtn.addEventListener('click', function() {
            if (currentOptionIndex > 0) {
                const letter = letters[currentOptionIndex - 1];
                
                // Remove the last option div
                const lastOption = optionsGrid.lastElementChild;
                if (lastOption) {
                    optionsGrid.removeChild(lastOption);
                }
                
                // Remove option from correct answer dropdown
                const optionToRemove = correctMCQ.querySelector(`option[value="${letter}"]`);
                if (optionToRemove) {
                    correctMCQ.removeChild(optionToRemove);
                }
                
                currentOptionIndex--;
                
                // Disable remove button if we're back to 4 options
                if (currentOptionIndex === 0) {
                    removeOptionBtn.disabled = true;
                }
                
                // Enable add button since we've removed an option
                addOptionBtn.disabled = false;
            }
        });
    }
});