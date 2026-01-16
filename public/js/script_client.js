document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const btnAdd = document.getElementById("btn-add");
    const btnClose = document.getElementById("btn-close");
    const btnClose1 = document.getElementById("btn-close-1");

    // Mở modal khi bấm nút "Thêm mới"
    btnAdd.addEventListener("click", function () {
        modal.classList.add("show");
        
        document.getElementById("situation").value = '';
        let today = new Date().toISOString().split('T')[0];
        document.getElementById("date").value = today;
        document.getElementById("reaction").value = '';
        document.getElementById("result").value = '';
        document.getElementById("content").value = '';
        document.getElementById("emotionId").value = '';

        document.querySelectorAll('input[name="emotion"]').forEach(radio => {
            radio.checked = false;
        });

        document.getElementById('btn-delete').style.display = 'none';
        document.getElementById('modalTitle').textContent = 'Thêm mới cảm xúc';

        const formContainer = document.querySelector('.form-fields-container');
        if (formContainer) {
            formContainer.scrollTop = 0;
        }
    });

    btnClose.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    btnClose1.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

// Xử lý click emotion card
document.querySelectorAll('.emotion-card').forEach(card => {
    card.addEventListener('click', function() {
        const emotionId = this.dataset.id;
        const situation = this.dataset.situation;
        const emotion = this.dataset.emotion;
        const date = this.dataset.date;
        const reaction = this.dataset.reaction;
        const result = this.dataset.result;
        const content = this.dataset.content;

        document.getElementById('situation').value = situation;
        document.querySelectorAll('input[name="emotion"]').forEach(radio => {
            radio.checked = (radio.value === emotion);
        });
        document.getElementById('date').value = date;
        document.getElementById('reaction').value = reaction;
        document.getElementById('result').value = result;
        document.getElementById('content').value = content;
        document.getElementById('emotionId').value = emotionId;
        
        document.getElementById('btn-delete').style.display = 'inline-block';
        document.getElementById('modalTitle').textContent = 'Cập nhật cảm xúc';
        
        document.getElementById('modal').classList.add("show");
        
        const formContainer = document.querySelector('.form-fields-container');
        if (formContainer) {
            formContainer.scrollTop = 0;
        }
    });
});

// Hàm lưu cảm xúc
function saveEmotion() {
    const situation = document.getElementById('situation').value;
    const emotion = document.querySelector('input[name="emotion"]:checked');
    const date = document.getElementById('date').value;
    const reaction = document.getElementById('reaction').value;
    const result = document.getElementById('result').value;
    const content = document.getElementById('content').value;

    let errorMessage = '';
    
    if (!situation.trim()) errorMessage += '- Vui lòng nhập tình huống\n';
    if (!emotion) errorMessage += '- Vui lòng chọn cảm xúc\n';
    if (!date) errorMessage += '- Vui lòng chọn ngày\n';
    if (!reaction.trim()) errorMessage += '- Vui lòng nhập phản ứng ban đầu\n';
    if (!result.trim()) errorMessage += '- Vui lòng nhập kết quả cuối cùng\n';
    if (!content.trim()) errorMessage += '- Vui lòng nhập bài học rút ra\n';

    if (errorMessage) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi nhập liệu',
            text: 'Vui lòng điền đầy đủ thông tin:\n' + errorMessage,
            footer: 'Các trường có dấu * là bắt buộc'
        });
        return;
    }

    const emotionId = document.getElementById('emotionId').value;
    const isEdit = emotionId !== '';

    const data = {
        situation: situation,
        emotion: emotion.value,
        date: date,
        reaction: reaction,
        result: result,
        content: content
    };

    if (isEdit) {
        data.id = emotionId;
    }

    const action = isEdit ? 'update' : 'insert';
    
    fetch(`/api/save-emotion?action=${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            if (!response.ok) throw new Error(data.error || 'HTTP error');
            return data;
        } catch (e) {
            throw new Error(text || 'Invalid JSON response');
        }
    })
    .then(result => {
        Swal.fire('Thành công!', 'Lưu dữ liệu thành công', 'success').then(() => {
            closeModal();
            location.reload();
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Lỗi!', error.message, 'error');
    });
}

// Xử lý delete
document.getElementById('btn-delete').addEventListener('click', function() {
    const emotionId = document.getElementById('emotionId').value;
    
    const data = {
        id: emotionId
    };

    Swal.fire({
        title: 'Xác nhận xóa?',
        text: "Bạn không thể hoàn tác hành động này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/save-emotion?action=delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(async response => {
                const text = await response.text();
                try {
                    const data = JSON.parse(text);
                    if (!response.ok) throw new Error(data.error || 'HTTP error');
                    return data;
                } catch (e) {
                    throw new Error(text || 'Invalid JSON response');
                }
            })
            .then(result => {
                Swal.fire('Thành công!', 'Xóa dữ liệu thành công', 'success').then(() => {
                    closeModal();
                    location.reload();
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Lỗi!', error.message, 'error');
            });
        }
    });
});

// Xử lý đổi mật khẩu
document.querySelector('.btn-change-password').addEventListener('click', () => {
    document.getElementById('passwordModal').classList.add('show');
});

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('show');
}

function changePassword() {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    fetch('/api/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
        })
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Lỗi không xác định');
        return data;
    })
    .then(result => {
        Swal.fire('Thành công!', 'Đổi mật khẩu thành công', 'success');
        closePasswordModal();
        document.getElementById('changePasswordForm').reset();
    })
    .catch(error => {
        Swal.fire('Lỗi!', error.message, 'error');
    });
}

function closeModal() {
    document.getElementById('modal').classList.remove("show");
}

// Logout confirmation
document.getElementById('logoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    Swal.fire({
        title: 'Xác nhận đăng xuất',
        text: "Bạn có chắc chắn muốn đăng xuất?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
        if (result.isConfirmed) {
            this.submit();
        }
    });
});

// Gán hàm saveEmotion cho button
document.getElementById('btn-save').addEventListener('click', saveEmotion);
