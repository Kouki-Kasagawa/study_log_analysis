const date = new Date();  //日付を初期化
const today = date.getDate(); //今月
const currentMonth = date.getMonth();　//月
const nowYear = date.getFullYear()//年

function createCalendar(month) {
    const monthDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];//月曜から日曜までのクラスを作成
    let calendarHTML = '';
    // calendarHTML += `<div><h2>` + nowYear + "年" + currentMonth + `月<h2>`;
    calendarHTML +=`<table class="calendar"><thead><tr>`;

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            calendarHTML += `<th class="sun">${monthDays[i]}</th>`;
        } else if (i === 6) {
            calendarHTML += `<th class="sat">${monthDays[i]}</th>`;
        } else {
            calendarHTML += `<th>${monthDays[i]}</th>`;
        }
    }// 日曜日（i===０）と土曜日(i===6)の時にはsunクラス、satクラスを付与


    calendarHTML += '</tr></thead><tbody>';
    //日付の計算を行う
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate(); //今月何日まであるか
    const firstDay = new Date(date.getFullYear(), month, 1).getDay();　//今月何曜日から始まるのか
    const daysInPrevMonth = new Date(date.getFullYear(), month, 0).getDate();　//先月何日まであったのか

    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < 6; i++) {
        //行(週)の部分のループ
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
            //列（曜日）の部分のループ
            if (i === 0 && j < firstDay) {
                //先月の残り muteクラスに定義する
                calendarHTML += `<td class="mute">${prevDayCount}</td>`;
                prevDayCount++;
            } else if (dayCount > daysInMonth) {
                //来月の部分　muteクラスに定義する
                let nextMonthDayCount = dayCount - daysInMonth;
                calendarHTML += `<td class="mute">${nextMonthDayCount}</td>`;
                dayCount++;
            } else {
                // 今日の日付　todayクラスを定義する
                if (dayCount === today && month === currentMonth) {
                    calendarHTML += `<td class="today">${dayCount}</td>`;
                } 
                else {
                    calendarHTML += `<td>${dayCount}</td>`;
                }
                dayCount++;
            }
        }

        calendarHTML += '</tr>';

        if (dayCount - daysInMonth > 7) {
            break;
        }
    }

    calendarHTML += '</tbody></table></div>';

    return calendarHTML;
}

document.getElementById('calendar').innerHTML = createCalendar(currentMonth) ;
// + createCalendar(currentMonth + 1)