
//初始化补充h1以及content
let date = new Date();
document.getElementById("date").textContent = date.toLocaleDateString();
fetch("../2024/" + (date.getMonth() + 1) + "-" + (date.getDate()) + ".md")
    .then(response => {
        if (response.ok) {
            md(`${date.getMonth() + 1}-${date.getDate()}`);
        }
        else {
            document.getElementById("content").textContent = "Temporary blank";
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });


//时间按钮展示日期
const timeButton = document.getElementById("time-button");
timeButton.addEventListener("click", () => {
    // 创建覆盖层
    const overlay = document.createElement("div");
    overlay.style.position = 'absolute';
    overlay.style.top = `${timeButton.offsetTop + timeButton.offsetHeight}px`; // 设置top为按钮的底部
    overlay.style.left = `${timeButton.offsetLeft + timeButton.offsetWidth - 257}px`; // 设置left与按钮对齐
    overlay.style.width = '250px';
    overlay.style.height = '200px';
    overlay.style.backgroundColor = 'rgb(255, 255, 220)';
    overlay.style.border = '3px solid rgb(255, 220, 187)';
    overlay.style.borderRadius = '0.3cm';
    overlay.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // 创建导航容器
    const navContainer = document.createElement("div");
    navContainer.style.display = 'flex';
    navContainer.style.justifyContent = 'center';
    navContainer.style.margin = '0px 0 10px 0 ';

    // 添加月份切换按钮
    const prevMonthButton = document.createElement("button");
    const nextMonthButton = document.createElement("button");
    prevMonthButton.textContent = '<<';
    nextMonthButton.textContent = '>>';
    prevMonthButton.style.height = '30px';
    nextMonthButton.style.height = '30px';
    prevMonthButton.style.border = 'none';
    nextMonthButton.style.border = 'none';
    prevMonthButton.style.color = "orange";
    nextMonthButton.style.color = "orange";
    prevMonthButton.style.backgroundColor = "rgb(255, 255, 220)";
    nextMonthButton.style.backgroundColor = "rgb(255, 255, 220)";
    prevMonthButton.style.borderRadius = "0.3cm";
    nextMonthButton.style.borderRadius = "0.3cm";

    // 月份显示
    let currentMonth = new Date().getMonth(); // 月份索引从0开始
    const monthDisplay = document.createElement("p");
    monthDisplay.textContent = `2024=>${currentMonth + 1}`;
    monthDisplay.style.display = 'inline';
    monthDisplay.style.width = '100px';
    monthDisplay.style.margin = '2px 2px 0 5px';

    prevMonthButton.onclick = () => {
        if (currentMonth > 0) {
            currentMonth--;
            monthDisplay.textContent = `2024=>${currentMonth + 1}`;
            updateDays(currentMonth);
        }
    };
    nextMonthButton.onclick = () => {
        if (currentMonth < 11) {
            currentMonth++;
            monthDisplay.textContent = `2024=>${currentMonth + 1}`;
            updateDays(currentMonth);
        }
    };

    // 添加到导航容器
    navContainer.appendChild(prevMonthButton);
    navContainer.appendChild(monthDisplay);
    navContainer.appendChild(nextMonthButton);

    // 创建日期按钮列表
    const daysList = document.createElement("ul");
    daysList.style.listStyleType = 'none';
    daysList.style.padding = '0';
    daysList.style.margin = '0';
    daysList.style.display = 'grid';
    daysList.style.gridTemplateColumns = 'repeat(7,1fr)';
    daysList.style.gap = '0';
    daysList.style.overflowY = 'auto';
    daysList.style.height = '140px';

    function updateDays(month) {
        daysList.innerHTML = ''; // 清空当前日期按钮
        const daysInMonth = new Date(2024, month + 1, 0).getDate(); // 获取当前月份的天数
        for (let day = 1; day <= daysInMonth + 1; day++) {
            const dayItem = document.createElement("li");
            const dayButton = document.createElement("button");
            dayButton.style.color = 'grey';
            dayButton.style.backgroundColor = 'rgb(255, 255, 220)';
            if (day === daysInMonth + 1) {
                dayButton.textContent = '/';
            }
            else {
                dayButton.textContent = day;
                fetch("../2024/" + (month + 1) + "-" + day + ".md")
                    .then(response => {
                        if (response.ok) {
                            // 如果请求成功且文件存在，改变颜色为黑色
                            dayButton.style.color = 'black';
                            dayButton.onmouseover = function () {
                                this.style.backgroundColor = "rgb(255, 136, 136)";
                                this.style.borderRadius = "0.2cm";
                            };
                            dayButton.onmouseout = function () {
                                this.style.backgroundColor = 'rgb(255, 255, 220)';
                            };
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data: ', error);
                    });
            }

            dayButton.onclick = () => {
                // 仅当按钮颜色为黑色时才调用md函数渲染Markdown日记
                if (dayButton.style.color === 'black') {
                    const date = `${month + 1}-${day}`;
                    document.getElementById("date").textContent = `2024/${month + 1}/${day}`;
                    md(date);
                } else {
                    console.log(`This day has no diary.`);
                }
            };
            dayButton.style.border = 'none';

            dayItem.appendChild(dayButton);
            daysList.appendChild(dayItem);
        }
    }

    // 初始加载当前月份的天数
    updateDays(currentMonth);

    // 组装元素
    overlay.appendChild(navContainer);
    overlay.appendChild(daysList);

    // 显示覆盖层
    document.body.appendChild(overlay);

    // 检查点击事件是否在覆盖层内部
    document.addEventListener('click', function handler(e) {
        if (!overlay.contains(e.target)) {
            document.body.removeChild(overlay);
            document.removeEventListener('click', handler); // 移除事件监听器以避免内存泄漏
        }
    }, { capture: true }); // 使用捕获阶段以确保先于其他点击事件监听器执行
});

//渲染markdown日记
function md(date) {
    // 使用Fetch API获取Markdown文件内容
    fetch('../2024/' + date + ".md")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            // 使用marked转换Markdown文本为HTML
            document.getElementById('content').innerHTML = marked(text);
        })
        .catch(error => {
            console.error('Failed to fetch the markdown file: ', error);
        });
}