function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member__skills');

  if (member) {
    member.addEventListener('click', () => {
      memberSkills.classList.toggle('member__skills--active');
    });
  }
}