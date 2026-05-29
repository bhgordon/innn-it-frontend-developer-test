describe("Update Modal", () => {
  beforeEach(() => {
    cy.window().then((win) => win.localStorage.clear());
    cy.visit("/");
  });

  // Helper to select form fields by their label text (accessible selector)
  const getByLabel = (label: string) => {
    return cy.contains("label", label).invoke("attr", "for").then((id) => {
      return cy.get(`#${CSS.escape(id!)}`);
    });
  };

  it("renders the modal with all form fields", () => {
    cy.contains("Neues Update erstellen");
    cy.contains("label", "Titel").should("exist");
    cy.contains("label", "Deine Neuigkeiten").should("exist");
    cy.contains("Absender ändern");
  });

  describe("Validation", () => {
    it("shows errors when publishing with empty required fields", () => {
      cy.contains("Update veröffentlichen").click();

      cy.contains("Bitte gib einen Titel ein.");
      cy.contains("Bitte schreibe ein paar Worte zu deinem Update.");
      cy.contains("Bitte korrigiere die folgenden Fehler:");
    });

    it("focuses the first invalid field on validation failure", () => {
      cy.contains("Update veröffentlichen").click();

      // Title is the first required field, so it should receive focus
      cy.focused().should("have.attr", "aria-required", "true");
      cy.focused().should("have.attr", "type", "text");
    });

    it("clears field errors as the user types", () => {
      cy.contains("Update veröffentlichen").click();
      cy.contains("Bitte gib einen Titel ein.");

      getByLabel("Titel").type("Test");
      cy.contains("Bitte gib einen Titel ein.").should("not.exist");
    });

    it("validates author field only when toggle is on", () => {
      getByLabel("Titel").type("Mein Titel");
      getByLabel("Deine Neuigkeiten").type("Mein Update");

      // Toggle author editing on, then publish with empty author
      cy.contains("Absender ändern").click();
      cy.contains("Update veröffentlichen").click();
      cy.contains("Bitte gib einen Absender ein.");
    });
  });

  describe("Draft persistence", () => {
    it("saves a draft to localStorage", () => {
      getByLabel("Titel").type("Entwurf Titel");
      getByLabel("Deine Neuigkeiten").type("Entwurf Inhalt");

      cy.contains("Entwurf speichern").click();
      cy.contains("Entwurf wurde erfolgreich gespeichert.");

      cy.window().then((win) => {
        const draft = JSON.parse(
          win.localStorage.getItem("petition-update-draft")!
        );
        expect(draft.title).to.equal("Entwurf Titel");
        expect(draft.content).to.equal("Entwurf Inhalt");
      });
    });

    it("restores a draft on page load", () => {
      const draft = {
        title: "Gespeicherter Titel",
        content: "Gespeicherter Inhalt",
        author: "",
        isAuthorEditable: false,
        savedAt: new Date().toISOString(),
      };
      cy.window().then((win) => {
        win.localStorage.setItem(
          "petition-update-draft",
          JSON.stringify(draft)
        );
      });

      cy.visit("/");
      getByLabel("Titel").should("have.value", "Gespeicherter Titel");
      getByLabel("Deine Neuigkeiten").should(
        "have.value",
        "Gespeicherter Inhalt"
      );
    });

    it("persists the author toggle state in the draft", () => {
      cy.contains("Absender ändern").click();
      cy.contains("Entwurf speichern").click();

      cy.window().then((win) => {
        const draft = JSON.parse(
          win.localStorage.getItem("petition-update-draft")!
        );
        expect(draft.isAuthorEditable).to.be.true;
      });
    });
  });

  describe("Publish", () => {
    it("shows success message when all required fields are filled", () => {
      getByLabel("Titel").type("Mein Titel");
      getByLabel("Deine Neuigkeiten").type("Mein Update Inhalt");

      cy.contains("Update veröffentlichen").click();
      cy.contains("Update wurde erfolgreich veröffentlicht.");
    });
  });

  describe("Cancel", () => {
    it("clears the form and localStorage after confirmation", () => {
      getByLabel("Titel").type("Zu löschender Titel");
      getByLabel("Deine Neuigkeiten").type("Zu löschender Inhalt");
      cy.contains("Entwurf speichern").click();

      cy.on("window:confirm", () => true);
      cy.contains("Abbrechen").click();

      getByLabel("Titel").should("have.value", "");
      getByLabel("Deine Neuigkeiten").should("have.value", "");

      cy.window().then((win) => {
        expect(win.localStorage.getItem("petition-update-draft")).to.be.null;
      });
    });

    it("does not clear the form when confirmation is dismissed", () => {
      getByLabel("Titel").type("Behalten");

      cy.on("window:confirm", () => false);
      cy.contains("Abbrechen").click();

      getByLabel("Titel").should("have.value", "Behalten");
    });
  });

  describe("Author toggle", () => {
    it("disables the author input when toggle is off", () => {
      cy.get("input[placeholder='Petra Petitionsstarterin']").should(
        "be.disabled"
      );
    });

    it("enables the author input when toggle is on", () => {
      cy.contains("Absender ändern").click();
      cy.get("input[placeholder='Petra Petitionsstarterin']").should(
        "not.be.disabled"
      );
    });
  });

  describe("Character counters", () => {
    it("updates the title character counter as the user types", () => {
      getByLabel("Titel").type("Hallo");
      cy.contains("5 / 100 Zeichen");
    });

    it("enforces the title max length of 100 characters", () => {
      const longText = "a".repeat(150);
      getByLabel("Titel").type(longText);
      cy.contains("100 / 100 Zeichen");
    });
  });
});
