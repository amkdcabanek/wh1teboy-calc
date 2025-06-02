// This file contains the JavaScript code for the calculator functionality.
// It handles user input, performs calculations, and updates the display.

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    // Initialize display with empty string
    display.value = '';
    
    // Track the last input for special feature
    let lastInput = '';
    
    // Special mode flag for easter egg
    let specialModeActive = false;
    
    // Add click event to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the button's value from its text content if data-value is missing
            const value = button.getAttribute('data-value') || button.textContent;
            handleButtonClick(value);
        });
    });
    
    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/') {
            handleButtonClick(key);
        } else if (key === '.') {
            handleButtonClick('.');
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === 'Escape') {
            handleButtonClick('clear');
        } else if (key === 'Backspace') {
            handleButtonClick('backspace');
        }
    });
    
    // Function to handle button clicks
    function handleButtonClick(value) {
        // For debugging
        console.log('Button clicked:', value);
        
        switch(value) {
            case 'C':
            case 'clear':
                display.value = '';
                lastInput = '';
                // Reset special mode on clear
                specialModeActive = false;
                break;
                
            case 'backspace':
            case '⌫':
                display.value = display.value.slice(0, -1);
                lastInput = display.value.slice(-1) || '';
                break;
                
            case '.':
                // Secret activation: dot activates special mode but doesn't appear
                specialModeActive = true;
                console.log('Special mode activated!');
                // Don't add the dot to the display
                lastInput = '.';
                break;
                
            case '=':
                if (specialModeActive) {
                    // Special mode is active, show the easter egg
                    display.value = '575393520';
                    // Reset special mode after showing it once
                    specialModeActive = false;
                    lastInput = '=';
                    break;
                }
                
                try {
                    if (display.value) {
                        // Replace visual operators with JavaScript operators
                        let expression = display.value
                            .replace(/×/g, '*')
                            .replace(/÷/g, '/')
                            .replace(/−/g, '-');
                        
                        console.log('Evaluating:', expression);
                        
                        // Evaluate and format the result
                        let result = eval(expression);
                        
                        // Format the result (handle long decimals)
                        if (result.toString().includes('.') && result.toString().split('.')[1].length > 8) {
                            result = parseFloat(result.toFixed(8));
                        }
                        
                        display.value = result;
                    }
                } catch (error) {
                    console.error('Calculation error:', error);
                    display.value = 'Error';
                    setTimeout(() => display.value = '', 1500);
                }
                lastInput = '=';
                break;
                
            case '%':
                try {
                    display.value = (parseFloat(display.value) / 100).toString();
                } catch (error) {
                    display.value = 'Error';
                    setTimeout(() => display.value = '', 1500);
                }
                lastInput = '%';
                break;
                
            default:
                // For operators, handle special characters
                if (['+', '-', '*', '/', '×', '÷', '−'].includes(value)) {
                    // Replace JavaScript operators with visual operators
                    const visibleValue = value
                        .replace('*', '×')
                        .replace('/', '÷')
                        .replace('-', '−');
                    
                    display.value += visibleValue;
                    lastInput = visibleValue;
                } else {
                    display.value += value;
                    lastInput = value;
                }
        }
    }
});

