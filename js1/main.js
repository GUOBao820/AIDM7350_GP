(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });

    
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
  const chatBox = document.getElementById('chatBox');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Display user message
    const userMsgElement = document.createElement('div');
    userMsgElement.classList.add('chat-message', 'user-message');
    userMsgElement.textContent = userMessage;
    chatBox.appendChild(userMsgElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input field
    userInput.value = '';

    // Send message to bot and get response
    getBotResponse(userMessage);
  }

  function getBotResponse(userMessage) {
    // Simulate API call to get bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage); // Replace with actual API call

      // Display bot response
      const botMsgElement = document.createElement('div');
      botMsgElement.classList.add('chat-message', 'bot-message');
      botMsgElement.textContent = botResponse;
      chatBox.appendChild(botMsgElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000); // Simulate delay for API response
  }

  function generateBotResponse(userMessage) {
    // Placeholder function to generate a simple bot response
    return `您询问的是：${userMessage}。这是一个示例回复。`; // Replace with actual logic or API response parsing
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const voteForm = document.getElementById('voteForm');
    const voteResults = document.getElementById('voteResults');

    let voteCounts = JSON.parse(localStorage.getItem('voteCounts')) || {
        "数据隐私与安全": 0,
        "AI 偏见与歧视": 0,
        "就业影响": 0,
        "安全风险": 0
    };

    function updateVoteResults() {
        let totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);

        // 更新每个选项的投票结果进度条
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach(item => {
            const option = item.querySelector('span').textContent;
            const progressBar = item.querySelector('.progress-bar');
            if (totalVotes > 0) {
                const percentage = (voteCounts[option] / totalVotes) * 100;
                progressBar.style.width = `${percentage}%`;
                progressBar.textContent = `${percentage.toFixed(0)}%`;
            } else {
                progressBar.style.width = '0%';
                progressBar.textContent = '0%';
            }
        });

        // 显示投票结果
        voteResults.style.display = 'block';
    }

    // 初始化时显示投票结果
    updateVoteResults();

    voteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="voteOption"]:checked');
        if (selectedOption) {
            voteCounts[selectedOption.value]++;
            localStorage.setItem('voteCounts', JSON.stringify(voteCounts));
            updateVoteResults();
            // 移除选中状态
            selectedOption.checked = false;
        }
    });
});
