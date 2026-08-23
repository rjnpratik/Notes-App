# Assuming you named the Apify script 'apify_transcript.py'
from apify_transcript import get_youtube_transcript
from llm_service import extract_full_notes

def generate_notes_from_url(video_url: str) -> str:
    """
    One-Shot Pipeline: URL -> Apify Transcript -> Single LLM Call -> Raw Markdown Notes.
    """
    # 1. Fetch transcript (Now returns a plain string)
    print(f"[Pipeline] 1. Fetching transcript for {video_url}...")
    transcript_text = get_youtube_transcript(video_url)
    
    # Check for the error strings we set up in the Apify file
    if transcript_text.startswith("Error"):
        raise ValueError(transcript_text)
    
    word_count = len(transcript_text.split())
    print(f"[Pipeline] Found transcript with {word_count} words.")

    # 2. Process via LLM (One-Shot)
    print(f"[Pipeline] 2. Sending entire transcript to Gemini...")
    final_notes = extract_full_notes(transcript_text)
    
    print("[Pipeline] 3. Processing complete!")
    return final_notes

if __name__ == "__main__":
    # Testing with the previously problematic URL
    test_url = "https://youtu.be/-dUiRtJ8ot0?si=48QWO8lEqUTo8V_j"
    
    print("=== Testing One-Shot Pipeline ===")
    try:
        notes_doc = generate_notes_from_url(test_url)

        print("\n" + "=" * 50)
        print("RAW LLM RESPONSE:")
        print("=" * 50)
        
        # Directly print the markdown text
        print(notes_doc)

        print("\nOne-Shot Pipeline executed successfully!")
    except Exception as err:
        print(f"Pipeline error: {err}")