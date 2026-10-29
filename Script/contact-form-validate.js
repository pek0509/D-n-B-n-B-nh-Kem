function getOrCreateContactFieldError(inputId, errorId) {
    var input = document.getElementById(inputId);
    if (!input) return null;

    var error = document.getElementById(errorId);
    if (!error) {
        error = document.createElement('div');
        error.id = errorId;
        error.style.color = 'red';
        error.style.fontSize = '14px';
        error.style.marginTop = '8px';
        error.style.marginBottom = '10px';
        error.style.display = 'none';
        input.insertAdjacentElement('afterend', error);
    }

    return error;
}

function setContactFieldError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = getOrCreateContactFieldError(inputId, errorId);
    if (!input || !error) return;

    input.style.border = message ? '1px solid red' : 'none';
    error.textContent = message || '';
    error.style.display = message ? 'block' : 'none';
}

function validateContactField(fieldName) {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');
    var subjectInput = document.getElementById('subject');
    var messageInput = document.getElementById('message');

    if (fieldName === 'name') {
        var name = nameInput ? nameInput.value.trim() : '';
        if (!name) {
            setContactFieldError('name', 'contact-name-error', 'Vui long nhap ho va ten.');
            return false;
        }
        if (name.length < 2) {
            setContactFieldError('name', 'contact-name-error', 'Ho va ten phai co it nhat 2 ky tu.');
            return false;
        }
        setContactFieldError('name', 'contact-name-error', '');
        return true;
    }

    if (fieldName === 'email') {
        var email = emailInput ? emailInput.value.trim() : '';
        if (!email) {
            setContactFieldError('email', 'contact-email-error', 'Vui long nhap email.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setContactFieldError('email', 'contact-email-error', 'Email khong dung dinh dang.');
            return false;
        }
        setContactFieldError('email', 'contact-email-error', '');
        return true;
    }

    if (fieldName === 'phone') {
        var phone = phoneInput ? phoneInput.value.replace(/\s+/g, '') : '';
        if (!phone) {
            setContactFieldError('phone', 'contact-phone-error', 'Vui long nhap so dien thoai.');
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            setContactFieldError('phone', 'contact-phone-error', 'So dien thoai phai du 10 chu so.');
            return false;
        }
        setContactFieldError('phone', 'contact-phone-error', '');
        return true;
    }

    if (fieldName === 'subject') {
        var subject = subjectInput ? subjectInput.value.trim() : '';
        if (!subject) {
            setContactFieldError('subject', 'contact-subject-error', 'Vui long nhap chu de.');
            return false;
        }
        if (subject.length < 4) {
            setContactFieldError('subject', 'contact-subject-error', 'Chu de can ro rang hon.');
            return false;
        }
        setContactFieldError('subject', 'contact-subject-error', '');
        return true;
    }

    if (fieldName === 'message') {
        var message = messageInput ? messageInput.value.trim() : '';
        if (!message) {
            setContactFieldError('message', 'contact-message-error', 'Vui long nhap tin nhan.');
            return false;
        }
        if (message.length < 10) {
            setContactFieldError('message', 'contact-message-error', 'Tin nhan can chi tiet hon.');
            return false;
        }
        setContactFieldError('message', 'contact-message-error', '');
        return true;
    }

    return true;
}

function validateContactForm() {
    var fields = ['name', 'email', 'phone', 'subject', 'message'];
    return fields.every(function(fieldName) {
        return validateContactField(fieldName);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contact-form');
    var status = document.getElementById('form_status');

    if (!contactForm) {
        return;
    }

    [
        { id: 'name', errorId: 'contact-name-error', field: 'name' },
        { id: 'email', errorId: 'contact-email-error', field: 'email' },
        { id: 'phone', errorId: 'contact-phone-error', field: 'phone' },
        { id: 'subject', errorId: 'contact-subject-error', field: 'subject' },
        { id: 'message', errorId: 'contact-message-error', field: 'message' }
    ].forEach(function(binding) {
        var input = document.getElementById(binding.id);
        if (!input) return;

        getOrCreateContactFieldError(binding.id, binding.errorId);

        ['input', 'blur'].forEach(function(eventName) {
            input.addEventListener(eventName, function () {
                validateContactField(binding.field);
            });
        });
    });

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!validateContactForm()) {
            if (status) {
                status.innerHTML = '<span class="wrong">Vui long kiem tra lai thong tin da nhap.</span>';
            }
            return;
        }

        if (status) {
            status.innerHTML = '<span class="success">Da ghi nhan lien he cua ban. Chung toi se phan hoi som nhat co the.</span>';
        }

        contactForm.reset();
        [
            ['name', 'contact-name-error'],
            ['email', 'contact-email-error'],
            ['phone', 'contact-phone-error'],
            ['subject', 'contact-subject-error'],
            ['message', 'contact-message-error']
        ].forEach(function(item) {
            setContactFieldError(item[0], item[1], '');
        });
    });
});
