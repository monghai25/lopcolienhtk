// Xử lý tabs
document.querySelectorAll('.tablink').forEach(button => {
    button.addEventListener('click', function() {
        // Xóa active
        document.querySelectorAll('.tablink').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Thêm active mới
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Export CSV
function exportCSV() {
    const params = new URLSearchParams(window.location.search);
    window.location.href = '/admin/export?' + params.toString();
}

// Logout confirmation
const logoutForm = document.getElementById('logoutForm');
if (logoutForm) {
    logoutForm.addEventListener('submit', function(e) {
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
}

// Đảm bảo chỉ hiển thị tab active khi load trang
document.addEventListener('DOMContentLoaded', function() {
    const dataTab = document.querySelector('#dataTab');
    const dataTabLink = document.querySelector('[data-tab="dataTab"]');
    
    if (dataTab) dataTab.classList.add('active');
    if (dataTabLink) dataTabLink.classList.add('active');
});
