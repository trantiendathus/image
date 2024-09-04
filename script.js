document.addEventListener('DOMContentLoaded', () => {
    // Lấy ảnh từ API "Dog V1" khi trang tải
    const apiSelect = document.getElementById('apiSelect');
    apiSelect.value = 'dog.ceo';  // Đặt giá trị mặc định là 'dog.ceo'
    fetchImage('dog.ceo');
    
    // Thiết lập chế độ tối nếu đã được lưu trong localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

document.getElementById('generateBtn').addEventListener('click', function() {
    const selectedApi = document.getElementById('apiSelect').value;
    fetchImage(selectedApi);
});

document.getElementById('toggleDarkModeBtn').addEventListener('click', function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

function fetchImage(api) {
    let apiUrl;
    let imageElement = document.getElementById('imageDisplay');

    if (api === 'dog.ceo') {
        apiUrl = 'https://dog.ceo/api/breeds/image/random';
    } else if (api === 'random.dog') {
        apiUrl = 'https://random.dog/woof.json';
    } else if (api === 'dog.v3') {
       imageElement.src = 'https://place.dog/500/500';
    } else if (api === 'cat.api') {
        apiUrl = 'https://api.thecatapi.com/v1/images/search';
    } else if (api === 'fox.api') {
        apiUrl = 'https://randomfox.ca/floof/';
    } else if (api === 'human.face') {
        imageElement.src = 'https://thispersondoesnotexist.com/';
        document.getElementById('loadingTime').textContent = 'Đang tải...';
        document.getElementById('loadingBar').style.width = '100%'; // Đặt thanh loading đầy
        document.getElementById('loadingWrapper').style.display = 'block';
        setTimeout(() => {
            document.getElementById('loadingWrapper').style.display = 'none';
        }, 500); // Ẩn thanh loading sau 0.5 giây
        return; // Dừng hàm vì không cần thêm xử lý
    }

    const startTime = new Date();  // Ghi lại thời gian bắt đầu tải

    // Hiển thị thanh loading
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.width = '0%'; // Đặt thanh loading về 0%
    document.getElementById('loadingWrapper').style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let imageUrl;
            if (api === 'dog.ceo') {
                imageUrl = data.message;
            } else if (api === 'random.dog') {
                imageUrl = data.url;
            } else if (api === 'dog.v3') {
                imageUrl = apiUrl;  // Không cần lấy URL từ phản hồi
            } else if (api === 'cat.api') {
                imageUrl = data[0].url;
            } else if (api === 'fox.api') {
                imageUrl = data.image;
            }

            if (imageUrl) {
                imageElement.src = imageUrl;
            }

            const endTime = new Date();  // Ghi lại thời gian kết thúc tải
            const loadingTime = (endTime - startTime) / 1000;  // Tính thời gian tải tính bằng giây
            document.getElementById('loadingTime').textContent = `Thời gian tải ảnh: ${loadingTime.toFixed(2)} giây`;

            // Ẩn thanh loading
            loadingBar.style.width = '100%';
            setTimeout(() => {
                document.getElementById('loadingWrapper').style.display = 'none';
            }, 500); // Ẩn thanh loading sau 0.5 giây
        })
        .catch(error => {
            console.error('Error fetching the image:', error);
            document.getElementById('loadingTime').textContent = 'Có lỗi khi tải ảnh.';
            loadingBar.style.width = '100%'; // Đặt thanh loading đầy khi có lỗi
            setTimeout(() => {
                document.getElementById('loadingWrapper').style.display = 'none';
            }, 500); // Ẩn thanh loading sau 0.5 giây
        });
}
