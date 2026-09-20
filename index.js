const display = document.getElementById('display');
let isCalculated = false;

// إضافة رقم أو نقطة عشرية
function appendNumber(number) {
    if (display.value === '0' || display.value === 'Error' || isCalculated) {
        display.value = number;
        isCalculated = false;
    } else {
        // منع إضافة أكثر من نقطة عشرية في نفس الرقم الحالي
        const currentTerms = display.value.split(/[\+\-\*\/]/);
        const currentNum = currentTerms[currentTerms.length - 1];
        if (number === '.' && currentNum.includes('.')) return;
        
        display.value += number;
    }
}

// إضافة عملية حسابية
function appendOperator(operator) {
    if (display.value === 'Error') return;
    
    isCalculated = false;
    const lastChar = display.value.slice(-1);

    // استبدال العملية إذا كانت الأخيرة عملية أخرى
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

// مسح الشاشة بالكامل
function clearDisplay() {
    display.value = '0';
    isCalculated = false;
}

// مسح آخر خانة (DEL)
function deleteLast() {
    if (display.value === 'Error' || isCalculated) {
        clearDisplay();
        return;
    }
    
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

// حساب النتيجة
function calculate() {
    try {
        if (display.value === 'Error') return;
        
        let result = eval(display.value);
        
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(6));
        }
        
        display.value = result;
        isCalculated = true;
    } catch (error) {
        display.value = 'Error';
    }
}

// ==========================================
//  دعم الإدخال من لوحة المفاتيح (Keyboard Listener)
// ==========================================
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // الأرقام والنقطة العشرية
    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    } 
    // العمليات الحسابية الأساسية
    else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } 
    // زر Enter أو = للحساب
    else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // لمنع السلوك الافتراضي للنموذج إن وجد
        calculate();
    } 
    // زر Backspace للمسح التدريجي
    else if (key === 'Backspace') {
        deleteLast();
    } 
    // زر Escape لمسح الشاشة بالكامل (C)
    else if (key === 'Escape') {
        clearDisplay();
    }
});