function valid_datas(form) {
    if (!form) {
        return false;
    }

    var status = jQuery('#form_status');
    var fields = jQuery(form).find('input,textarea');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fields.css('border', 'none');

    if (form.name.value.trim() === '') {
        status.html('<span class="wrong">Vui lòng nhập họ và tên.</span>');
        notice(form.name, form);
        return false;
    }

    if (form.email.value.trim() === '' || !emailPattern.test(form.email.value.trim())) {
        status.html('<span class="wrong">Vui lòng nhập email hợp lệ.</span>');
        notice(form.email, form);
        return false;
    }

    if (form.subject.value.trim() === '') {
        status.html('<span class="wrong">Vui lòng nhập chủ đề.</span>');
        notice(form.subject, form);
        return false;
    }

    if (form.message.value.trim() === '') {
        status.html('<span class="wrong">Vui lòng nhập nội dung tin nhắn.</span>');
        notice(form.message, form);
        return false;
    }

    status.html('<span class="success">Đã ghi nhận liên hệ của bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.</span>');
    form.reset();
    return false;
}

function notice(field, form) {
    jQuery(form).find('input,textarea').css('border', 'none');
    field.style.border = '1px solid red';
    field.focus();
}

document.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        valid_datas(contactForm);
    });
});
