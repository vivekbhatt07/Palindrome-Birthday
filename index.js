const palindromeInput = document.querySelector(".palindrome-input");
const palindromeButton = document.querySelector(".check-palindrome-btn");
const palindromeMessage = document.querySelector(".message");

palindromeButton.addEventListener("click", function onClick() {
  const dateData = palindromeInput.value;
  if (dateData !== "") {
    const filterHyphen = dateData.split("-");
    var isPalindrome = checkPalindromeForAllFormats({
      day: Number(filterHyphen[2]),
      month: Number(filterHyphen[1]),
      year: Number(filterHyphen[0]),
    });
    if (isPalindrome) {
      return (palindromeMessage.innerText = `Your Birthday is a Palindrome`);
    } else {
      const [count, next] = nextPalindromeDate({
        day: Number(filterHyphen[2]),
        month: Number(filterHyphen[1]),
        year: Number(filterHyphen[0]),
      });
      return (palindromeMessage.innerText = `Next Palindrome Date is ${next.day}-${next.month}-${next.year} missed by ${count}`);
    }
  }
});

// REVERSE FUNCTION:
function reverseData(data) {
  return data.split("").reverse().join("");
}

// CHECK PALINDROME:
function checkPalindrome(str) {
  return reverseData(str) === str;
}

// CONVERT DATE NUMBER-STRING :
function dateNumberToString(dateNumber) {
  const dateString = { day: "", month: "", year: "" };
  if (dateNumber.day < 10) {
    dateString.day = "0" + dateNumber.day;
  } else {
    dateString.day = dateNumber.day.toString();
  }

  if (dateNumber.month < 10) {
    dateString.month = "0" + dateNumber.month;
  } else {
    dateString.month = dateNumber.month.toString();
  }

  dateString.year = dateNumber.year.toString();

  return dateString;
}

// GET ALL DATE FORMATS:
function getDateFormats(date) {
  const dateStr = dateNumberToString(date);
  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// CHECK PAILNDROME FOR ALL DATE FORMATS:
var date = { day: 28, month: 2, year: 2020 };

function checkPalindromeForAllFormats(tareek) {
  const listOfFormats = getDateFormats(tareek);
  let isPalindrome = false;
  for (let i = 0; i < listOfFormats.length; i = i + 1) {
    if (checkPalindrome(listOfFormats[i])) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

// console.log(CheckPalindromeForAllFormats(date));

// CHECK LEAP YEAR :
function checkLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// NEXT DATE:

function nextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  const isLeapYear = checkLeapYear(date.year);
  const listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear) {
      if (day > 29) {
        day = 1;
        month = month + 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = month + 1;
      }
    }
  } else {
    if (day > listOfDays[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }

  if (month === 13 && day === 1) {
    day = 1;
    month = 1;
    year = year + 1;
  }

  return { day: day, month: month, year: year };
}

// NEXT PALINDROME DATE:
function nextPalindromeDate(date) {
  var count = 0;
  var next = nextDate(date);
  while (1) {
    count++;
    var isThisPalindrome = checkPalindromeForAllFormats(next);
    if (isThisPalindrome) {
      break;
    }
    next = nextDate(next);
  }
  return [count, next];
}

nextPalindromeDate(date);

// PREVIOUS PALINDROME DATE:
function previousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  const isLeapYear = checkLeapYear(date.year);
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (isLeapYear) {
      if (day === 0) {
        day = 29;
        month = month - 1;
      }
    } else {
      if (day === 0) {
        day = 28;
        month = month - 1;
      }
    }
  } else {
    if (day === 0) {
      day = monthDays[month - 2];
      month = month - 1;
    }
  }

  if (day === 0 && month === 1) {
    day = 31;
    month = 12;
    year = year - 1;
  }

  return { day: day, month: month, year: year };
}

function previousPalindromeDate(date) {
  var countPrev = 0;
  var datePrev = previousDate(date);
  while (1) {
    countPrev++;
    var checkForPalindrome = checkPalindromeForAllFormats(datePrev);
    if (checkForPalindrome) {
      break;
    }
    var datePrev = previousDate(datePrev);
  }
  return [countPrev, datePrev];
}
