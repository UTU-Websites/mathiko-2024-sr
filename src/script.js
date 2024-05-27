var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Close all other sections
    for (var j = 0; j < coll.length; j++) {
      if (coll[j] !== this) {
        coll[j].classList.remove("active");
        coll[j].nextElementSibling.style.maxHeight = null;
      }
    }
    
    // Toggle the current section
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}