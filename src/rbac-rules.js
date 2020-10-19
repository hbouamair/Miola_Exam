const rules = {
    etudiant: {
      static: ["posts:list", "home-page:visit"],
      dynamic: {
        "resultat:visit": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        },
        "exam:view":({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        },
        "cour:view":({nom, cournom}) => {
          if (!nom || !cournom) return false;
          return nom === cournom;
        }
      }
    },
    professeur: {
      static: [
        "posts:list",
        "posts:create",
        "users:getSelf",
        "exam:add",
        "exam:view",
        "resultat:add",
        "resultat:visit",
        "home-page:visit",
        "dashboard-page:visit",
        "listetudiant:edit"
      ],
      dynamic: {
        "exam:edit": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        },
        "cour:view": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        },"resultat:edit": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        }
      }
    },
    admin: {
      static: [
        "resultat:edit",
        "listetudiant:edit",
        "listsalle:edit",
        "salle:edit",
        "etudiant:edit",
        "etudiant:add",
        "exam:add",
        "exam:edit",
        "exam:view",
        "resultat:add",
        "resultat:visit",
        "cour:add",
        "cour:view",
        "posts:edit",
        "posts:delete",
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit"
      ]
    }
  };
  
  export default rules;