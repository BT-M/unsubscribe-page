/**
 * Unsubscribe Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get form and elements
    const form = document.getElementById('unsubscribe-form');
    const emailInput = document.getElementById('email');
    const allCheckbox = document.getElementById('all');
    const otherCheckboxes = [
        document.getElementById('newsletters'),
        document.getElementById('promotions'),
        document.getElementById('events')
    ];
    const cancelBtn = document.getElementById('cancel-btn');

    // Handle "Unsubscribe from all" checkbox
    if (allCheckbox) {
        allCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            
            // If "Unsubscribe from all" is checked, uncheck and disable other options
            otherCheckboxes.forEach(checkbox => {
                if (checkbox) {
                    checkbox.checked = false;
                    checkbox.disabled = isChecked;
                    
                    // Apply visual indication of disabled state
                    const checkboxGroup = checkbox.closest('.checkbox-group');
                    if (checkboxGroup) {
                        if (isChecked) {
                            checkboxGroup.style.opacity = '0.5';
                            checkboxGroup.style.pointerEvents = isChecked ? 'none' : 'auto';
                        } else {
                            checkboxGroup.style.opacity = '1';
                            checkboxGroup.style.pointerEvents = 'auto';
                        }
                    }
                }
            });
        });
    }

    // Handle other checkboxes - if any are checked, uncheck "Unsubscribe from all"
    otherCheckboxes.forEach(checkbox => {
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                // If any of the other checkboxes are checked, uncheck "Unsubscribe from all"
                const anyChecked = otherCheckboxes.some(cb => cb && cb.checked);
                if (anyChecked && allCheckbox) {
                    allCheckbox.checked = false;
                }
                
                // If all other checkboxes are unchecked, check "Unsubscribe from all"
                const allUnchecked = otherCheckboxes.every(cb => cb && !cb.checked);
                if (allUnchecked && allCheckbox) {
                    allCheckbox.checked = true;
                    // Trigger the change event to disable the other checkboxes
                    const event = new Event('change');
                    allCheckbox.dispatchEvent(event);
                }
            });
        }
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate email
            const email = emailInput.value.trim();
            if (!isValidEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Ensure at least one option is selected
            const allUnchecked = !allCheckbox.checked && otherCheckboxes.every(cb => cb && !cb.checked);
            if (allUnchecked) {
                // If no options are selected, default to unsubscribe all
                allCheckbox.checked = true;
                // Trigger change event to update UI
                const event = new Event('change');
                allCheckbox.dispatchEvent(event);
            }
            
            // Gather form data
            const formData = {
                email: email,
                preferences: {
                    unsubscribeAll: allCheckbox ? allCheckbox.checked : false,
                    newsletters: otherCheckboxes[0] ? otherCheckboxes[0].checked : false,
                    promotions: otherCheckboxes[1] ? otherCheckboxes[1].checked : false,
                    events: otherCheckboxes[2] ? otherCheckboxes[2].checked : false
                }
            };
            
            // In a real application, you would send this data to a server
            console.log('Form submission:', formData);
            
            // Simulate API call with a short delay
            showLoading();
            
            setTimeout(() => {
                // Hide loading state
                hideLoading();
                
                // Show success message (in a real app, this would happen after successful API call)
                showSuccessMessage();
            }, 1500);
        });
    }

    // Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            // In a real application, this might redirect to the home page
            window.location.href = 'https://suitsupply.com';
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(inputElement, message) {
        // Remove any existing error message
        const parent = inputElement.parentElement;
        const existingError = parent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to input
        inputElement.classList.add('error');
        
        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--color-error, #d32f2f)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '6px';
        
        parent.appendChild(errorElement);
        
        // Focus the input
        inputElement.focus();
        
        // Remove error when input changes
        inputElement.addEventListener('input', function onInput() {
            inputElement.classList.remove('error');
            const error = parent.querySelector('.error-message');
            if (error) {
                error.remove();
            }
            inputElement.removeEventListener('input', onInput);
        });
    }

    // Show loading state
    function showLoading() {
        if (!form) return;
        
        // Disable form inputs
        const inputs = form.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        // Change submit button text
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">&#8635;</span> Updating...';
        }
        
        // Add loading style
        form.style.opacity = '0.7';
    }
    
    // Hide loading state
    function hideLoading() {
        if (!form) return;
        
        // Re-enable form inputs
        const inputs = form.querySelectorAll('input, button');
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        // Reset submit button text
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Update Preferences';
        }
        
        // Remove loading style
        form.style.opacity = '1';
    }

    // Show success message
    function showSuccessMessage() {
        // Hide the form
        if (form) {
            form.style.display = 'none';
        }
        
        // Get the form wrapper
        const formWrapper = document.querySelector('.form-wrapper');
        if (formWrapper) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            
            // Add success icon
            const icon = document.createElement('div');
            icon.className = 'success-icon';
            icon.innerHTML = '✓';
            
            // Add success heading
            const heading = document.createElement('h2');
            heading.className = 'title-02-medium';
            heading.textContent = 'Preferences Updated!';
            heading.style.marginBottom = '16px';
            
            // Add success text
            const text = document.createElement('p');
            text.className = 'body-regular';
            text.textContent = 'Your email preferences have been successfully updated. Thank you for your continued interest in Suitsupply.';
            text.style.marginBottom = '24px';
            
            // Add home button
            const homeButton = document.createElement('a');
            homeButton.href = 'https://suitsupply.com';
            homeButton.className = 'btn-primary';
            homeButton.textContent = 'Return to Homepage';
            homeButton.style.display = 'inline-block';
            
            // Append elements
            successMessage.appendChild(icon);
            successMessage.appendChild(heading);
            successMessage.appendChild(text);
            successMessage.appendChild(homeButton);
            
            // Add to form wrapper
            formWrapper.innerHTML = '';
            formWrapper.appendChild(successMessage);
        }
    }
    
    // Add keyframe animation for loading spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});