// excelExport.js
// Module to generate an Excel file with separate sheets for each test section
const XLSX = require('xlsx');

function createWorkbook(data) {
  const wb = XLSX.utils.book_new();
  // Build metadata sheet for all sections
  const metadataHeader = [
    'ID',
    'Name',
    'Timer',
    'ScoringScale',
    'Question',
    'Description',
    'Calculator',
    'Annotation',
    'Review',
    'CrossOption',
  ];
  const metadataRows = data.sections.map(section => [
    section.id,
    section.name,
    section.timer,
    section.scoringScale,
    section.numberOfQuestions,
    section.description,
    section.permissions && section.permissions.calculatorAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.annotationAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.reviewAllowed ? 'Yes' : 'No',
    section.permissions && section.permissions.crossOptionAllowed ? 'Yes' : 'No'
  ]);
  const metadataSheetData = [metadataHeader, ...metadataRows];
  const metadataSheet = XLSX.utils.aoa_to_sheet(metadataSheetData);
  XLSX.utils.book_append_sheet(wb, metadataSheet, 'Section Metadata');

  
  // Create scoring worksheet
  const scoringHeaders = ['CorrectQ', 'Scale1', 'Scale2'];
  const scoringData = data.scoringData || [];
  
  // Transform scoring data into rows
  const scoringRows = scoringData.map(row => ({
    'CorrectQ': row.CorrectQ,
    'Scale1': row.Scale1,
    'Scale2': row.Scale2 || ''
  }));
  
  const scoringWS = XLSX.utils.json_to_sheet(scoringRows, {
    header: scoringHeaders
  });
  // Set column widths for scoring worksheet
  scoringWS['!cols'] = [
    { wch: 15 },  
    { wch: 15 }, 
    { wch: 15 }   
  ];

  
      
    
    
  
  
  XLSX.utils.book_append_sheet(wb, scoringWS, 'Scoring');

  // Build section sheets
  data.sections.forEach(section => {
    const sectionInfoHeader = [
      'QuestionNumber',
      'CorrectAnswer',
      'Concepts',
      'Strategies',
      'QuestionType',
      'Passage',
      'QuestionImage',
      'AnswerImage',
      'QuestionText',
      'Option_A',
      'Option_B',
      'Option_C',
      'Option_D',
      'Option_E',
      'Option_F',
      'Option_G',
      'Option_H',
      'Option_I',
      'Option_J',
      
    ];
    // Section info row is not needed as a single row, so skip it

    // Build question rows with consecutive numbering
    const questionRows = (section.questions || []).map((q, idx) => [
      idx + 1,
      q.correct || q.correctAnswer || '',
      q.concepts || '',
      q.learningStrategies || '',
      q.type || '',
      q.additionalOptions && q.additionalOptions.includeReadingPassage ? 'Yes' : 'No',
      q.additionalOptions && q.additionalOptions.includeQuestionImage ? 'Yes' : 'No',
      q.additionalOptions && q.additionalOptions.includeAnswerImages ? 'Yes' : 'No',
      q.text || q.questionText || '',
      q.options ? (q.options.A || (Array.isArray(q.options) ? q.options[0] : '')) : '',
      q.options ? (q.options.B || (Array.isArray(q.options) ? q.options[1] : '')) : '',
      q.options ? (q.options.C || (Array.isArray(q.options) ? q.options[2] : '')) : '',
      q.options ? (q.options.D || (Array.isArray(q.options) ? q.options[3] : '')) : '',
      q.options ? (q.options.E || (Array.isArray(q.options) ? q.options[4] : '')) : '',
      q.options ? (q.options.F || (Array.isArray(q.options) ? q.options[5] : '')) : '',
      q.options ? (q.options.G || (Array.isArray(q.options) ? q.options[6] : '')) : '',
      q.options ? (q.options.H || (Array.isArray(q.options) ? q.options[7] : '')) : '',
      q.options ? (q.options.I || (Array.isArray(q.options) ? q.options[8] : '')) : '',
      q.options ? (q.options.J || (Array.isArray(q.options) ? q.options[9] : '')) : '',

    ]);

    const sheetData = [sectionInfoHeader, ...questionRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, section.id);
  });
  return wb;
}

module.exports = { createWorkbook };
