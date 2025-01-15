import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Avatar,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Agency() {
  const { id } = useParams();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [issue, setIssue] = useState({});
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const fetchIssue = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/users/get-issues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setIssue(res?.data?.issue || {});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    setNotesLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}v1/issues/${id}/notes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setNotes(res?.data?.notes || []);
      setNotesLoading(false);
    } catch (error) {
      console.log(error);
      setNotesLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}v1/issues/${id}/notes`,
        { note: newNote },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setNotes((prevNotes) => [...prevNotes, res.data]);
      setNewNote("");
      Swal.fire(t("note_added_successfully"), "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(t("failed_to_add_note"), "", "error");
    }
  };

  const handleEditNote = async (noteId) => {
    console.log(noteId);
    if (!editingNoteText.trim()) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}v1/issues/${id}/notes/${noteId}`,
        { note: editingNoteText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, note: editingNoteText } : note
        )
      );
      setEditingNoteId(null);
      setEditingNoteText("");
      Swal.fire(t("note_updated_successfully"), "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(t("failed_to_update_note"), "", "error");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}v1/issues/${id}/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      Swal.fire(t("note_deleted_successfully"), "", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(t("failed_to_delete_note"), "", "error");
    }
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f4f8"
      p={4}
      sx={{
        backgroundImage: "url(/backBook.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          boxShadow: 5,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#5c7c93",
            color: "#fff",
            p: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${import.meta.env.VITE_API_URL_IMAGE}${issue?.court_id}`}
            sx={{
              bgcolor: "#fff",
              color: "#5c7c93",
              mr: 2,
              width: 56,
              height: 56,
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={56} height={56} />
            ) : (
              issue?.court_name?.[0]
            )}
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            {loading ? (
              <Skeleton width={200} />
            ) : (
              `${t("court_name")}: ${issue?.court_name}`
            )}
          </Typography>
        </Box>

        <CardContent>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
            <Box>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} height={30} sx={{ mb: 1 }} />
                ))
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Base Number:</strong> {issue?.base_number}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Record Number:</strong> {issue?.record_number}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Agency Sequential:</strong>{" "}
                    {issue?.agency_sequential}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Agency Record:</strong> {issue?.agency_record}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Status:</strong> {issue?.status}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Start Date:</strong> {issue?.start_date}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Estimated Cost:</strong> {issue?.estimated_cost}
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} height={30} sx={{ mb: 1 }} />
                ))
              ) : (
                <>
                  <Typography variant="body1" mb={1}>
                    <strong>Is Active:</strong> {issue?.is_active}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    <strong>Court Room Name:</strong> {issue?.court_room_name}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<NoteIcon />}
            onClick={() => {
              fetchNotes();
              setDialogOpen(true);
            }}
            disabled={loading}
          >
            {t("view_notes")}
          </Button>
        </CardActions>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>{t("notes")}</DialogTitle>
        <DialogContent>
          {notesLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={50} sx={{ mb: 1 }} />
            ))
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <Box
                key={note.id}
                mb={2}
                p={2}
                borderRadius={2}
                bgcolor={note.sender_type === "lawyer" ? "#e3f2fd" : "#f9fbe7"}
              >
                {editingNoteId === note.id ? (
                  <>
                    <TextField
                      fullWidth
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                      <Button
                        color="primary"
                        onClick={() => handleEditNote(note.id)}
                        size="small"
                      >
                        {t("save")}
                      </Button>
                      <Button
                        onClick={() => setEditingNoteId(null)}
                        size="small"
                      >
                        {t("cancel")}
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" fontWeight={600}>
                      {note.sender_type === "lawyer"
                        ? t("lawyer_note")
                        : t("user_note")}
                    </Typography>
                    <Typography variant="body1" mb={1}>
                      {note.note}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditingNoteId(note.id);
                          setEditingNoteText(note.note);
                        }}
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteNote(note.id)}
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </>
                )}
              </Box>
            ))
          ) : (
            <Typography>{t("no_notes_available")}</Typography>
          )}

          <Box mt={3}>
            <TextField
              fullWidth
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              label={t("add_new_note")}
              variant="outlined"
              size="small"
            />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddNote}
                color="primary"
              >
                {t("add_note")}
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
